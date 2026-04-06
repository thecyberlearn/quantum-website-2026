/* ================================================================
   Quantum Tasks AI - Static Website JavaScript
   ================================================================ */

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


