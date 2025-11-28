document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Set initial state
    chatPopup.style.display = 'none';
    chatButton.classList.add('animate-button');

    // Toggle chat popup
    chatButton.addEventListener('click', () => {
        chatPopup.style.display = 'block';
        chatButton.classList.remove('animate-button');
    });

    // Close chat popup
    closeChat.addEventListener('click', () => {
        chatPopup.style.display = 'none';
        chatButton.classList.add('animate-button');
    });

    // Send message function
    function sendUserMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            appendMessage(message, 'user');
            messageInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                appendMessage(botResponse, 'bot');
            }, 1000);
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

    // Simple bot response logic
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('help')) {
            return "I'd be happy to help. What do you need assistance with?";
        } else if (message.includes('contact')) {
            return "You can reach out through the contact form above or email directly at adityabhandari164@gmail.com";
        } else if (message.includes('experience') || message.includes('work')) {
            return "I have experience in AI/ML and Full Stack Development. Check out my experience section above for more details!";
        } else {
            return "I'm not sure I understand. Could you please rephrase that?";
        }
    }
});