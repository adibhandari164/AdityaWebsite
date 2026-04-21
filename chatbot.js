document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const API_BASE_URL = 'https://website-chatbot-backend-py1p.vercel.app';
    const SESSION_STORAGE_KEY = 'chatbot_session_id';
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY) || '';
    let hasLoadedHistory = false;

    // Set initial state
    chatPopup.style.display = 'none';
    chatButton.classList.add('animate-button');

    // Toggle chat popup
    chatButton.addEventListener('click', async () => {
        chatPopup.style.display = 'block';
        chatButton.classList.remove('animate-button');
        await loadHistoryOnce();
    });

    // Close chat popup
    closeChat.addEventListener('click', () => {
        chatPopup.style.display = 'none';
        chatButton.classList.add('animate-button');
    });

    // Send message function
    async function sendUserMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            appendMessage(message, 'user');
            messageInput.value = '';
            setSendingState(true);
            const botMessageEl = createBotMessageElement('Responding...');

            try {
                await streamBotResponse(message, botMessageEl);
            } catch (error) {
                console.error('Chat request failed:', error);
                botMessageEl.textContent = 'Sorry, there was an error connecting to the chatbot. Please try again.';
            } finally {
                setSendingState(false);
            }
        }
    }

    // Handle send button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Handle enter key press
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Append message to chat
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function createBotMessageElement(initialText) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot');
        messageDiv.textContent = initialText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv;
    }

    function updateBotMessageElement(messageDiv, text) {
        messageDiv.textContent = text || ' ';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function streamBotResponse(message, botMessageEl) {
        const payload = {
            message,
            session_id: sessionId
        };

        const response = await fetch(`${API_BASE_URL}/chat/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/event-stream'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok || !response.body) {
            throw new Error(`Chat stream request failed with status ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let streamedReply = '';
        let hasReplyToken = false;
        let streamError = null;

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                buffer += decoder.decode();
            } else {
                buffer += decoder.decode(value, { stream: true });
            }

            // Normalize line endings to support both \n and \r\n SSE formats.
            const normalized = buffer.replace(/\r\n/g, '\n');
            const events = normalized.split('\n\n');
            buffer = events.pop() || '';

            for (const rawEvent of events) {
                const eventError = processSseEvent(
                    rawEvent,
                    botMessageEl,
                    streamedReply,
                    hasReplyToken
                );
                streamedReply = eventError.streamedReply;
                hasReplyToken = eventError.hasReplyToken;
                if (eventError.error) {
                    streamError = eventError.error;
                    break;
                }
            }

            if (streamError || done) {
                break;
            }
        }

        // Process any final event block still in the buffer.
        if (!streamError && buffer.trim()) {
            const eventResult = processSseEvent(
                buffer,
                botMessageEl,
                streamedReply,
                hasReplyToken
            );
            streamedReply = eventResult.streamedReply;
            hasReplyToken = eventResult.hasReplyToken;
            streamError = eventResult.error;
        }

        if (streamError) {
            throw streamError;
        }

        if (!hasReplyToken || !streamedReply.trim()) {
            throw new Error('LLM returned an empty reply.');
        }
    }

    function processSseEvent(rawEvent, botMessageEl, currentReply, currentHasToken) {
        const lines = rawEvent
            .split('\n')
            .filter((line) => line.startsWith('data:'))
            .map((line) => line.replace(/^data:\s*/, '').trim())
            .filter(Boolean);

        let streamedReply = currentReply;
        let hasReplyToken = currentHasToken;
        let error = null;

        for (const line of lines) {
            try {
                const eventData = JSON.parse(line);
                if (eventData.type === 'session' && eventData.session_id) {
                    sessionId = eventData.session_id;
                    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
                } else if (eventData.type === 'token') {
                    hasReplyToken = true;
                    streamedReply += eventData.content || '';
                    updateBotMessageElement(botMessageEl, streamedReply);
                } else if (eventData.type === 'error') {
                    error = new Error(eventData.message || 'Unknown streaming error.');
                    break;
                }
            } catch (parseError) {
                error = new Error(`Invalid stream payload: ${parseError.message}`);
                break;
            }
        }

        return { streamedReply, hasReplyToken, error };
    }

    function setSendingState(isSending) {
        sendMessage.disabled = isSending;
        messageInput.disabled = isSending;
    }

    async function loadHistoryOnce() {
        if (hasLoadedHistory || !sessionId) {
            hasLoadedHistory = true;
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chat/sessions/${encodeURIComponent(sessionId)}/history`);
            if (!response.ok) {
                // Session might be expired on backend; clear local copy.
                if (response.status === 404 || response.status === 400) {
                    sessionId = '';
                    localStorage.removeItem(SESSION_STORAGE_KEY);
                }
                hasLoadedHistory = true;
                return;
            }

            const data = await response.json();
            if (Array.isArray(data.messages) && data.messages.length > 0) {
                data.messages.forEach((item) => {
                    if (!item || !item.content || !item.role) {
                        return;
                    }
                    const sender = item.role === 'assistant' ? 'bot' : 'user';
                    appendMessage(item.content, sender);
                });
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
        } finally {
            hasLoadedHistory = true;
        }
    }
});