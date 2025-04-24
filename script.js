// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
        card.addEventListener('mouseenter', function () {
            this.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });



    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.hover-icons button:nth-child(1)');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function (e) {
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
        button.addEventListener('click', function (e) {
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
        newsletterForm.addEventListener('submit', function (e) {
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
        contactForm.addEventListener('submit', function (e) {
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add CSS hover effect to back to top button
    backToTopButton.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-3px)';
    });

    backToTopButton.addEventListener('mouseleave', function () {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });

    // Product filter functionality (placeholder for future implementation)
    // This would typically connect to a backend or dynamically filter products

    // Product search functionality
    const searchIcon = document.querySelector('.nav-icons .icon:first-child');

    if (searchIcon) {
        searchIcon.addEventListener('click', function (e) {
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
            searchModal.querySelector('.close-search').addEventListener('click', function () {
                searchModal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(searchModal);
                }, 300);
            });

            // Handle search form submission
            searchModal.querySelector('.search-form').addEventListener('submit', function (e) {
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

            tab.addEventListener('mouseenter', function () {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--dark-color)';
                }
            });

            tab.addEventListener('mouseleave', function () {
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
            tab.addEventListener('click', function () {
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
// Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart-container');
    const overlay = document.getElementById('overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cart = [];

    // Open cart
    cartIcon.addEventListener('click', function () {
        cartContainer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close cart
    function closeCartFunction() {
        cartContainer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeCart.addEventListener('click', closeCartFunction);
    overlay.addEventListener('click', closeCartFunction);

    // Add products to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace('$', '');
            const productImage = productCard.querySelector('.product-image img').src;

            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: parseFloat(productPrice),
                    image: productImage,
                    quantity: 1
                });
            }

            updateCart();
            cartContainer.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add animation
            const notification = document.createElement('div');
            notification.classList.add('add-to-cart-notification');
            notification.textContent = 'Item added to cart';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartTotal.textContent = '$0.00';
            cartCount.textContent = '0';
            return;
        }

        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-controls">
              <button class="quantity-btn minus" data-index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
          </div>
          <button class="remove-btn" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = itemCount.toString();

        // Add event listeners to the newly created buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Initialize the cart
    updateCart();

    // Checkout button functionality
    document.querySelector('.checkout-btn').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Proceeding to checkout...');
        // Here you would normally redirect to a checkout page
    });
});
