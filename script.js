// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const chatButton = document.getElementById('chat-button');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const userMessageInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chat-messages');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Chatbot functionality
    if (chatButton && chatbotContainer && closeChat) {
        chatButton.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
        
        closeChat.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }
    
    // Send message in chatbot
    if (sendMessage && userMessageInput && chatMessages) {
        sendMessage.addEventListener('click', sendUserMessage);
        userMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
        
        function sendUserMessage() {
            const messageText = userMessageInput.value.trim();
            if (messageText === '') return;
            
            // Add user message
            addMessage(messageText, 'user');
            userMessageInput.value = '';
            
            // Simulate bot response (setTimeout to mimic processing)
            setTimeout(() => {
                const botResponses = [
                    "Thanks for your message! Our customer service team will assist you shortly.",
                    "We have a wide range of sportswear designed for your specific activity. What sport are you shopping for?",
                    "Our performance fabrics are designed to wick moisture away from your body, keeping you dry during intense workouts.",
                    "AERO Fit products come with a 30-day satisfaction guarantee. You can return unworn items for a full refund.",
                    "We offer free shipping on orders over $75. Standard delivery takes 3-5 business days.",
                    "Our size guide can be found on each product page. Would you like me to help you find the right fit?",
                    "New collections are released seasonally, with special drops throughout the year. Sign up for our newsletter to stay updated!"
                ];
                
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(randomResponse, 'bot');
            }, 800);
        }
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            
            const messagePara = document.createElement('p');
            messagePara.textContent = text;
            
            messageContent.appendChild(messagePara);
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
            
            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Testimonials slider
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    // Initialize testimonial slider
    if (testimonials.length > 0 && dots.length > 0) {
        showTestimonial(0);
        
        // Add click event to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showTestimonial(i);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            let next = currentTestimonial + 1;
            if (next >= testimonials.length) next = 0;
            showTestimonial(next);
        }, 5000);
    }
    
    // Product hover effect (optional enhancement)
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });
    
    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.hover-icons button:nth-child(2)');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Add cart animation
            const card = this.closest('.product-card');
            if (card) {
                const productName = card.querySelector('h3').textContent;
                showNotification(`Added ${productName} to cart!`);
            }
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.hover-icons button:nth-child(1)');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart" style="color: var(--accent-color);"></i>';
                const card = this.closest('.product-card');
                if (card) {
                    const productName = card.querySelector('h3').textContent;
                    showNotification(`Added ${productName} to wishlist!`);
                }
            } else {
                this.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    });
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.hover-icons button:nth-child(3)');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            if (card) {
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                
                alert(`Quick view for ${productName} - ${productPrice} - Coming soon!`);
            }
        });
    });
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles to the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '1100',
            backgroundColor: '#fff',
            padding: '15px 20px',
            borderRadius: '4px',
            boxShadow: '0 3px 15px rgba(0,0,0,0.2)',
            transform: 'translateX(120%)',
            transition: 'transform 0.3s ease'
        });
        
        Object.assign(notification.querySelector('.notification-content').style, {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        });
        
        notification.querySelector('i').style.color = 'var(--success-color)';
        notification.querySelector('i').style.fontSize = '1.2rem';
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email !== '') {
                emailInput.value = '';
                showNotification('Thank you for subscribing to our newsletter!');
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (nameInput.value.trim() !== '' && emailInput.value.trim() !== '' && messageInput.value.trim() !== '') {
                // Simulate form submission
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                showNotification('Your message has been sent successfully!');
            }
        });
    }
    
    // Back to top button (create dynamically)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.id = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    // Style the back to top button
    Object.assign(backToTopButton.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '99',
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS hover effect to back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });
    
    // Product filter functionality (placeholder for future implementation)
    // This would typically connect to a backend or dynamically filter products
    
    // Product search functionality
    const searchIcon = document.querySelector('.nav-icons .icon:first-child');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create and display search modal
            const searchModal = document.createElement('div');
            searchModal.classList.add('search-modal');
            
            searchModal.innerHTML = `
                <div class="search-container">
                    <form class="search-form">
                        <input type="text" placeholder="Search for products..." autofocus>
                        <button type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <button class="close-search"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            document.body.appendChild(searchModal);
            
            // Style the search modal
            Object.assign(searchModal.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: '2000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });
            
            Object.assign(searchModal.querySelector('.search-container').style, {
                width: '90%',
                maxWidth: '600px',
                position: 'relative'
            });
            
            Object.assign(searchModal.querySelector('.search-form').style, {
                display: 'flex',
                width: '100%'
            });
            
            Object.assign(searchModal.querySelector('input').style, {
                flex: '1',
                padding: '15px',
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: '4px 0 0 4px'
            });
            
            Object.assign(searchModal.querySelector('button[type="submit"]').style, {
                padding: '0 20px',
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
            });
            
            Object.assign(searchModal.querySelector('.close-search').style, {
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer'
            });
            
            // Animate in
            setTimeout(() => {
                searchModal.style.opacity = '1';
            }, 10);
            
            // Close search modal
            searchModal.querySelector('.close-search').addEventListener('click', function() {
                searchModal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(searchModal);
                }, 300);
            });
            
            // Handle search form submission
            searchModal.querySelector('.search-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const searchQuery = this.querySelector('input').value.trim();
                
                if (searchQuery !== '') {
                    searchModal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(searchModal);
                        alert(`Searching for: ${searchQuery} - Search results coming soon!`);
                    }, 300);
                }
            });
        });
    }
    
    // Product filter tabs (for category-based filtering)
    function createFilterTabs() {
        const featuredSection = document.querySelector('.featured');
        if (!featuredSection) return;
        
        const categories = ['All', 'Men', 'Women', 'Accessories', 'New Arrivals'];
        
        const filterTabsContainer = document.createElement('div');
        filterTabsContainer.classList.add('filter-tabs');
        
        let tabsHTML = '';
        categories.forEach((category, index) => {
            tabsHTML += `<button class="filter-tab ${index === 0 ? 'active' : ''}" data-category="${category.toLowerCase()}">${category}</button>`;
        });
        
        filterTabsContainer.innerHTML = tabsHTML;
        
        // Insert after section header
        const sectionHeader = featuredSection.querySelector('.section-header');
        sectionHeader.insertAdjacentElement('afterend', filterTabsContainer);
        
        // Style the filter tabs
        Object.assign(filterTabsContainer.style, {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '30px'
        });
        
        const filterTabs = filterTabsContainer.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            Object.assign(tab.style, {
                padding: '8px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: 'var(--grey-color)',
                transition: 'var(--transition)'
            });
            
            tab.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--dark-color)';
                }
            });
            
            tab.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--grey-color)';
                }
            });
        });
        
        // Set active tab style
        const activeTab = filterTabsContainer.querySelector('.filter-tab.active');
        if (activeTab) {
            activeTab.style.color = 'var(--primary-color)';
            activeTab.style.borderBottom = '2px solid var(--primary-color)';
        }
        
        // Handle tab clicks
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active state
                filterTabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.color = 'var(--grey-color)';
                    t.style.borderBottom = 'none';
                });
                
                this.classList.add('active');
                this.style.color = 'var(--primary-color)';
                this.style.borderBottom = '2px solid var(--primary-color)';
                
                const category = this.getAttribute('data-category');
                
                // In a real application, this would filter products
                // For now, show a notification
                if (category !== 'all') {
                    showNotification(`Filtering products by: ${category}`);
                }
            });
        });
    }
    
    // Initialize filter tabs
    createFilterTabs();
    
    // Add loading screen (optional enhancement)
    function createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.classList.add('loading-screen');
        
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="logo">
                    <h1>AERO<span>fit</span></h1>
                </div>
                <div class="loading-spinner"></div>
            </div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Style the loading screen
        Object.assign(loadingScreen.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            transition: 'opacity 0.5s ease, visibility 0.5s ease'
        });
        
        Object.assign(loadingScreen.querySelector('.loading-content').style, {
            textAlign: 'center'
        });
        
        const loadingSpinner = loadingScreen.querySelector('.loading-spinner');
        Object.assign(loadingSpinner.style, {
            width: '40px',
            height: '40px',
            margin: '20px auto 0',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        });
        
        // Create the spin animation
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Hide loading screen after a delay
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1500);
    }
    
    // Initialize loading screen
    createLoadingScreen();

    // AOS-like animation (Animate on Scroll) - lightweight implementation
    function initializeAOSEffect() {
        const animatedElements = document.querySelectorAll('.section-header, .product-card, .collection-card, .feature, .about-content, .testimonial, .instagram-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            // Set initial style
            Object.assign(element.style, {
                opacity: '0',
                transform: 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease'
            });
            
            observer.observe(element);
        });
        
        // Create the animation class
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Initialize AOS-like animations
    setTimeout(initializeAOSEffect, 1500);
});

// Cart Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get cart elements
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    // Check if elements exist
    if (!cartIcon || !cartDropdown) return;
    
    // Function to show cart
    function showCart() {
        cartDropdown.style.display = 'block';
    }
    
    // Function to hide cart
    function hideCart() {
        cartDropdown.style.display = 'none';
    }
    
    // Mobile detection (to differentiate between mobile and desktop)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // For mobile: Only toggle on click
        let isCartOpen = false;
        
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isCartOpen = !isCartOpen;
            
            if (isCartOpen) {
                showCart();
            } else {
                hideCart();
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (isCartOpen && !cartDropdown.contains(e.target)) {
                hideCart();
                isCartOpen = false;
            }
        });
    } else {
        // For desktop: Show on hover and click
        
        // Hover functionality
        cartIcon.addEventListener('mouseenter', showCart);
        
        // Keep cart open when hovering over the dropdown
        cartDropdown.addEventListener('mouseenter', showCart);
        
        // Hide when mouse leaves both cart icon and dropdown
        cartIcon.addEventListener('mouseleave', function() {
            // Small timeout to check if mouse moved to dropdown
            setTimeout(() => {
                if (!cartDropdown.matches(':hover')) {
                    hideCart();
                }
            }, 100);
        });
        
        cartDropdown.addEventListener('mouseleave', hideCart);
        
        // Click functionality (toggle)
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (cartDropdown.style.display === 'block') {
                hideCart();
            } else {
                showCart();
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (cartDropdown.style.display === 'block' && 
                !cartDropdown.contains(e.target) && 
                !cartIcon.contains(e.target)) {
                hideCart();
            }
        });
    }
    
    // Sample cart functionality (Add to cart buttons)
    const addToCartButtons = document.querySelectorAll('.hover-icons .fa-shopping-cart');
    
    addToCartButtons.forEach(button => {
        button.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update cart count for demonstration
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent);
                cartCount.textContent = currentCount + 1;
            }
            
            // Show the cart
            showCart();
            
            // Alert for demonstration purposes
            alert('Item added to cart!');
        });
    });
});