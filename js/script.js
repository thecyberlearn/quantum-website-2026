/* ================================================================
   Quantum Tasks AI - Static Website JavaScript
   ================================================================ */

// Mobile navigation
(function() {
    var btn = document.getElementById('hdr-burger');
    var nav = document.getElementById('hdr-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function() {
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !btn.contains(e.target)) {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================================
// CONTACT FORM HANDLER
// ================================================================

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.messagesDiv = document.getElementById('form-messages');
        this.messageTextarea = document.getElementById('message');
        this.messageCounter = document.getElementById('message-count');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.setupEventListeners();
        if (this.messageTextarea && this.messageCounter) {
            this.updateCharCounter();
        }
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        if (this.messageTextarea) {
            this.messageTextarea.addEventListener('input', this.updateCharCounter.bind(this));
        }
        
        // Real-time validation
        ['name', 'email', 'company', 'subject', 'message'].forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', () => this.clearFieldError(fieldName));
            }
        });
    }
    
    updateCharCounter() {
        if (!this.messageTextarea || !this.messageCounter) return;
        
        const length = this.messageTextarea.value.length;
        this.messageCounter.textContent = length;
        
        const counter = this.messageCounter.parentElement;
        counter.classList.remove('warning', 'error');
        
        if (length > 900) {
            counter.classList.add('error');
        } else if (length > 800) {
            counter.classList.add('warning');
        }
    }
    
    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        if (!field || !errorDiv) return true;
        
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch(fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (value.length > 100) {
                    errorMessage = 'Name must be less than 100 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s\-\.']+$/.test(value)) {
                    errorMessage = 'Name contains invalid characters';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value || value.length > 254) {
                    errorMessage = 'Please provide a valid email address';
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Please enter a valid email format';
                    isValid = false;
                }
                break;
                
            case 'company':
                if (value && value.length > 100) {
                    errorMessage = 'Company name must be less than 100 characters';
                    isValid = false;
                }
                break;
            
            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message must be less than 1000 characters';
                    isValid = false;
                }
                break;
        }
        
        if (isValid) {
            field.classList.remove('error');
            errorDiv.textContent = '';
        } else {
            field.classList.add('error');
            errorDiv.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        if (field) field.classList.remove('error');
        if (errorDiv) errorDiv.textContent = '';
    }
    
    validateForm() {
        const fields = ['name', 'email', 'subject', 'message'];
        let isValid = true;
        
        fields.forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        // Validate company if provided
        const company = document.getElementById('company');
        if (company && company.value.trim() && !this.validateField('company')) {
            isValid = false;
        }
        
        return isValid;
    }
    
    showMessage(message, type = 'success') {
        if (!this.messagesDiv) return;
        
        this.messagesDiv.className = `form-messages ${type}`;
        this.messagesDiv.textContent = message;
        this.messagesDiv.style.display = 'block';
        
        // Scroll to message
        this.messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.messagesDiv.style.display = 'none';
            }, 10000);
        }
    }
    
    setLoading(loading) {
        if (!this.submitBtn) return;
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'flex';
            this.submitBtn.disabled = true;
        } else {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous messages
        if (this.messagesDiv) {
            this.messagesDiv.style.display = 'none';
        }
        
        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors above.', 'error');
            return;
        }
        
        this.setLoading(true);
        
        // Since this is a static site, we'll just show a success message
        // and reset the form (no actual form submission to backend)
        setTimeout(() => {
            this.showMessage(
                'Thank you for your message! We have received your inquiry and will get back to you within 24 hours. ' +
                'For urgent matters, please email us directly at abhay@quantumtaskai.com',
                'success'
            );
            
            this.form.reset();
            if (this.messageTextarea && this.messageCounter) {
                this.updateCharCounter();
            }
            
            // Clear any field errors
            ['name', 'email', 'company', 'subject', 'message'].forEach(fieldName => {
                this.clearFieldError(fieldName);
            });
            
            this.setLoading(false);
        }, 1500);
    }
}

// ================================================================
// DIGITAL BRANDING PAGE INTERACTIONS
// ================================================================

class DigitalBrandingManager {
    constructor() {
        this.processCards = document.querySelectorAll('.process-step-card');
        this.raceCards = document.querySelectorAll('.race-card');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.ctaButtons = document.querySelectorAll('.cta-btn');
        
        if (this.processCards.length > 0 || this.raceCards.length > 0 || this.serviceCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.setupCardInteractions();
        this.setupButtonHovers();
        this.addScrollAnimations();
    }
    
    setupCardInteractions() {
        // Process step cards
        this.processCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHighlight(card);
            });
        });

        // RACE framework cards
        this.raceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHighlight(card);
            });
        });

        // Service cards
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHighlight(card);
            });
        });
    }
    
    highlightCard(card) {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 20px 40px rgba(30, 64, 175, 0.15)';
    }
    
    removeHighlight(card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    }
    
    setupButtonHovers() {
        this.ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
            
            button.addEventListener('click', (e) => {
                if (!button.classList.contains('loading')) {
                    button.classList.add('loading');
                    const originalText = button.textContent;
                    button.textContent = '⏳ Loading...';
                    
                    setTimeout(() => {
                        if (button.classList.contains('loading')) {
                            button.classList.remove('loading');
                            button.textContent = originalText;
                        }
                    }, 2000);
                }
            });
        });
    }
    
    addScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe cards for scroll animations
            [...this.processCards, ...this.raceCards, ...this.serviceCards].forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
            
            // Observe sections
            document.querySelectorAll('.section-header, .cta-content').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        }
    }
}

// ================================================================
// GENERAL ANIMATIONS AND INTERACTIONS
// ================================================================

class GeneralInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupCardHovers();
        this.setupButtonEffects();
    }
    
    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animations
            document.querySelectorAll('.service-card, .client-card, .achievement-item, .trust-card').forEach(card => {
                observer.observe(card);
            });
        }
    }
    
    setupCardHovers() {
        // Add hover effects to all interactive cards
        document.querySelectorAll('.service-card, .client-card, .choice-card, .quick-access-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    setupButtonEffects() {
        // Add click effects to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// ================================================================
// INITIALIZATION
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form handler
    new ContactFormHandler();
    
    // Initialize digital branding interactions
    new DigitalBrandingManager();
    
    // Initialize general interactions
    new GeneralInteractions();
    
    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]:not([href*="quantumtaskai.com"])').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            this.textContent = '⏳ Loading...';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.textContent = originalText;
            }, 2000);
        });
    });
    
    // Smooth loading for app links
    document.querySelectorAll('a[href*="app.quantumtaskai.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            this.style.opacity = '0.8';
            const originalText = this.textContent;
            this.textContent = '🚀 Launching...';
            
            // Reset after a short delay if user comes back
            setTimeout(() => {
                this.style.opacity = '1';
                this.textContent = originalText;
            }, 3000);
        });
    });
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.animate-in {
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// ================================================================
// BLOG FUNCTIONALITY
// ================================================================

let blogData = null;
let filteredPosts = [];
let currentCategory = 'all';
let searchQuery = '';

// Load blog data
async function loadBlogData() {
    try {
        // Check if we're on a blog post page (in /blog/ directory)
        const isInBlogDirectory = window.location.pathname.includes('/blog/');
        const dataPath = isInBlogDirectory ? '../blog-data.json' : 'blog-data.json';
        
        const response = await fetch(dataPath);
        blogData = await response.json();
        return blogData;
    } catch (error) {
        console.error('Failed to load blog data:', error);
        return null;
    }
}

// Load and display blog posts
async function loadBlogPosts() {
    const loadingElement = document.getElementById('blogLoading');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    
    if (!loadingElement || !gridElement) return;
    
    // Show skeleton loading state
    loadingElement.innerHTML = `
      <div class="skeleton">
        <div class="skeleton-item">
          <div class="skeleton-line sm"></div>
          <div class="skeleton-line lg"></div>
          <div class="skeleton-line md"></div>
        </div>
        <div class="skeleton-item">
          <div class="skeleton-line sm"></div>
          <div class="skeleton-line lg"></div>
          <div class="skeleton-line md"></div>
        </div>
      </div>`;
    loadingElement.style.display = 'block';
    gridElement.style.display = 'none';
    if (emptyElement) emptyElement.style.display = 'none';
    
    // Load data if not already loaded
    if (!blogData) {
        blogData = await loadBlogData();
        if (!blogData) {
            loadingElement.innerHTML = '<p>Failed to load blog posts.</p>';
            return;
        }
    }
    
    // Filter and display posts
    filterAndDisplayPosts();
}

// Filter posts based on category and search
function filterAndDisplayPosts() {
    if (!blogData) return;
    
    let posts = blogData.posts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        posts = posts.filter(post => post.category === currentCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        posts = posts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query)) ||
            post.content.toLowerCase().includes(query)
        );
    }
    
    filteredPosts = posts;
    displayBlogPosts(posts);
}

// Display blog posts in minimal list format
function displayBlogPosts(posts) {
    const loadingElement = document.getElementById('blogLoading');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    
    if (!gridElement) return;
    
    // Hide loading
    if (loadingElement) loadingElement.style.display = 'none';
    
    if (posts.length === 0) {
        gridElement.style.display = 'none';
        if (emptyElement) emptyElement.style.display = 'block';
        return;
    }
    
    // Show grid and hide empty state
    gridElement.style.display = 'block';
    if (emptyElement) emptyElement.style.display = 'none';
    
    // Generate HTML for posts in minimal format
    gridElement.innerHTML = posts.map((post, index) => {
        const categoryInfo = blogData.categories[post.category] || { name: post.category };
        const isFeatured = post.featured && index < 2;
        
        return `
            <article class="article-item ${isFeatured ? 'featured' : ''}" data-category="${post.category}">
                <div class="article-meta">
                    <span class="article-category">${categoryInfo.name}</span>
                    <span>${formatDate(post.publishDate)}</span>
                    <span>${post.readTime}</span>
                </div>
                <h2 class="article-title">
                    <a href="blog/${post.slug}.html" class="article-link" style="color: inherit; text-decoration: none;">
                        ${post.title}
                    </a>
                </h2>
                <p class="article-excerpt">${post.excerpt}</p>
                <div class="article-footer">
                    <span class="article-author">${post.author}</span>
                    <a href="blog/${post.slug}.html" class="article-link">Read article →</a>
                </div>
            </article>
        `;
    }).join('');
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter by category
function filterCategory(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-link').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Filter and display posts
    filterAndDisplayPosts();
}

// Search functionality
function searchBlog() {
    const searchInput = document.getElementById('blogSearch');
    if (!searchInput) return;
    
    searchQuery = searchInput.value.trim();
    filterAndDisplayPosts();
}

// Setup search input listener
function setupBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    if (!searchInput) return;
    
    // Live search with debounce (no separate button needed)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = this.value.trim();
            filterAndDisplayPosts();
        }, 300);
    });
}

// Newsletter form handler
function setupNewsletterForm() {
    const forms = document.querySelectorAll('#newsletterForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitBtn) return;
            
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate newsletter signup
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Subscribed!';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });
}

// Load related articles for blog post pages
async function loadRelatedArticles() {
    const relatedContainer = document.getElementById('relatedArticles');
    if (!relatedContainer) return;
    
    // Load blog data if not already loaded
    if (!blogData) {
        blogData = await loadBlogData();
        if (!blogData) return;
    }
    
    // Get random 2 posts (excluding current post if applicable)
    const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const availablePosts = blogData.posts.filter(post => post.slug !== currentSlug);
    const relatedPosts = shuffleArray(availablePosts).slice(0, 2);
    
    // Display related posts
    relatedContainer.innerHTML = relatedPosts.map(post => {
        const categoryInfo = blogData.categories[post.category] || { name: post.category };
        
        return `
            <article class="related-card">
                <div class="related-meta">
                    <span class="related-category">${categoryInfo.name}</span>
                    <span>${formatDate(post.publishDate)}</span>
                    <span>${post.readTime}</span>
                </div>
                <h4 class="related-title">
                    <a href="${post.slug}.html" class="related-link">${post.title}</a>
                </h4>
                <p class="related-excerpt">${post.excerpt}</p>
                <div class="related-footer">
                    <span class="related-author">${post.author}</span>
                    <a href="${post.slug}.html" class="related-read">Read article</a>
                </div>
            </article>
        `;
    }).join('');
}

// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Reading progress for blog posts
function setupReadingProgress() {
    const bar = document.getElementById('readingProgress') || document.getElementById('readingProgressBar');
    if (!bar) return;

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, docHeight ? scrollTop / docHeight : 0));
        bar.style.width = (progress * 100) + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

// Setup social sharing
function setupSocialSharing() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, 'share', 'width=600,height=400');
            }
        });
    });
}

// Initialize blog functionality
function initBlogFunctionality() {
    // Setup search
    setupBlogSearch();
    
    // Setup newsletter forms
    setupNewsletterForm();
    
    // Setup social sharing
    setupSocialSharing();
    
    // Load related articles if on blog post page
    if (document.getElementById('relatedArticles')) {
        loadRelatedArticles();
    }

    // Setup reading progress on article pages if present
    if (document.getElementById('readingProgress')) {
        setupReadingProgress();
    }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBlogFunctionality();
});