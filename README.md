# Personal Website

A modern, responsive personal website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and mobile-first responsive layout.

## Features

- 🎨 **Modern Design**: Clean, professional layout with gradient backgrounds and modern typography
- 📱 **Responsive**: Mobile-first design that works perfectly on all devices
- 🚀 **Smooth Animations**: Scroll-triggered animations and hover effects
- 🧭 **Navigation**: Fixed navigation with smooth scrolling and active state indicators
- 📝 **Contact Form**: Functional contact form with validation and notifications
- 🎯 **Interactive Elements**: Hover effects, counters, and dynamic content
- 🌐 **Cross-browser Compatible**: Works on all modern browsers

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information with animated statistics
3. **Skills Section**: Technical skills organized by category
4. **Projects Section**: Portfolio showcase with project cards
5. **Contact Section**: Contact information and form
6. **Footer**: Copyright and additional information

## File Structure

```
Personal Website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and interactions
└── README.md           # This file
```

## Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website should load immediately with all functionality

### Local Development

To run the website locally:

1. Navigate to the project directory
2. Open `index.html` in your browser
3. For development, you can use a local server:
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx serve .`
   - **VS Code**: Use the "Live Server" extension

## Customization

### Personal Information

Edit the following sections in `index.html`:

- **Name**: Replace "Aditya" with your name throughout the file
- **Title**: Update the hero subtitle and description
- **About**: Modify the about section text and statistics
- **Skills**: Add/remove skills and technologies
- **Projects**: Update project descriptions, technologies, and links
- **Contact**: Update contact information and social media links

### Styling

Modify `styles.css` to customize:

- **Colors**: Update the CSS custom properties for primary/secondary colors
- **Fonts**: Change the Google Fonts import and font-family declarations
- **Layout**: Adjust spacing, padding, and grid layouts
- **Animations**: Modify transition timings and animation properties

### Functionality

Edit `script.js` to customize:

- **Form handling**: Modify the contact form submission logic
- **Animations**: Adjust scroll trigger thresholds and animation speeds
- **Interactions**: Customize hover effects and interactive elements

## Key Customization Areas

### 1. Hero Section
```html
<h1 class="hero-title">Hi, I'm <span class="highlight">Your Name</span></h1>
<p class="hero-subtitle">Your Professional Title</p>
<p class="hero-description">Your personal description here...</p>
```

### 2. About Section
```html
<div class="about-stats">
    <div class="stat">
        <h3>5+</h3>
        <p>Years Experience</p>
    </div>
    <!-- Add more stats as needed -->
</div>
```

### 3. Skills Section
```html
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
</div>
<!-- Add more skills with appropriate Font Awesome icons -->
```

### 4. Projects Section
```html
<div class="project-card">
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="your-live-link" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live
            </a>
        </div>
    </div>
</div>
```

### 5. Contact Information
```html
<div class="contact-method">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>Email</h4>
        <p>your.email@example.com</p>
    </div>
</div>
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons for skills and projects
- **Google Fonts**: Inter font family for typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images and content load as needed
- **Smooth Scrolling**: Optimized scroll performance
- **CSS Animations**: Hardware-accelerated animations
- **Responsive Images**: Optimized for different screen sizes

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be deployed automatically
3. Custom domain can be added in settings

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a custom domain and SSL certificate

## Customization Tips

1. **Start Small**: Begin with personal information and gradually customize styling
2. **Test Responsiveness**: Always test on mobile devices
3. **Optimize Images**: Use compressed images for better performance
4. **SEO**: Add meta tags and structured data for better search visibility
5. **Analytics**: Integrate Google Analytics or similar for visitor tracking

## Troubleshooting

### Common Issues

1. **Fonts not loading**: Check internet connection and Google Fonts availability
2. **Icons not showing**: Ensure Font Awesome CDN is accessible
3. **Animations not working**: Check if JavaScript is enabled
4. **Mobile menu issues**: Verify CSS media queries are correct

### Performance Issues

1. **Slow loading**: Optimize images and minimize CSS/JS
2. **Janky animations**: Reduce animation complexity on mobile
3. **Large file sizes**: Compress images and minify code

## Contributing

Feel free to fork this project and customize it for your needs. If you make improvements, consider sharing them with the community.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions about customization:

1. Check the troubleshooting section above
2. Review the code comments for guidance
3. Search for similar issues online
4. Create an issue in the project repository

## Future Enhancements

Potential improvements you could add:

- **Blog Section**: Add a blog or articles section
- **Dark Mode**: Implement theme switching
- **Multi-language**: Add internationalization support
- **CMS Integration**: Connect to a headless CMS
- **Portfolio Gallery**: Add image galleries for projects
- **Testimonials**: Include client or colleague testimonials
- **Resume Download**: Add downloadable resume/CV
- **Social Media Feed**: Integrate social media posts

---

**Happy coding! 🚀**

Your personal website is now ready to showcase your skills and projects to the world. 