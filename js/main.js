// Main JavaScript for Guía IA | GrupoO2

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupScrollEffects();
    setupInteractiveElements();
    setupChart();
    setupModals();
    setActiveSection();
    setupAILab();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open (only on mobile)
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Index cards navigation
    const indexCards = document.querySelectorAll('.index-card');
    indexCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const correspondingNav = document.querySelector(`a[href="#${target}"]`);
                if (correspondingNav) {
                    correspondingNav.classList.add('active');
                }
            }
        });
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    // Set initial state based on screen size
    function setInitialSidebarState() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        } else {
            sidebar.classList.remove('-translate-x-full');
        }
    }

    // Set initial state
    setInitialSidebarState();

    // Handle window resize
    window.addEventListener('resize', setInitialSidebarState);

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const isHidden = sidebar.classList.contains('-translate-x-full');
    
    if (isHidden) {
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full');
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
    }
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update active navigation
                const sectionId = entry.target.id;
                updateActiveNavigation(sectionId);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function setActiveSection() {
    // Set the first section as active by default
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
}

// Interactive Elements Setup
function setupInteractiveElements() {
    // Group option buttons
    const groupOptions = document.querySelectorAll('.group-option');
    groupOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.group-option');
            siblings.forEach(sibling => {
                sibling.classList.remove('bg-corporate-blue', 'text-white');
                sibling.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked option
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-corporate-blue', 'text-white');
            
            // Show success message
            showNotification('¡Gracias por tu participación!', 'success');
        });
    });

    // Add hover effects to cards
    addCardHoverEffects();
}

function addCardHoverEffects() {
    // AI Model cards
    const aiModelCards = document.querySelectorAll('.ai-model-card');
    aiModelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Chart Setup
function setupChart() {
    const ctx = document.getElementById('impactChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Eficiencia', 'Creatividad', 'Precisión', 'Innovación', 'Satisfacción'],
                datasets: [{
                    label: 'Impacto Potencial (%)',
                    data: [85, 70, 90, 75, 80],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f97316',
                        '#8b5cf6',
                        '#ef4444'
                    ],
                    borderColor: [
                        '#1e40af',
                        '#047857',
                        '#c2410c',
                        '#6d28d9',
                        '#dc2626'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `Mejora esperada: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
}

// Modal Functions
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.3s ease';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Reflection Functions
function toggleReflection(reflectionId) {
    const reflection = document.getElementById(reflectionId);
    if (reflection) {
        reflection.classList.toggle('hidden');
        
        if (!reflection.classList.contains('hidden')) {
            // Focus on textarea
            const textarea = reflection.querySelector('textarea');
            if (textarea) {
                setTimeout(() => textarea.focus(), 100);
            }
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${getNotificationClasses(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getNotificationIcon(type)} mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationClasses(type) {
    switch(type) {
        case 'success': return 'bg-green-500 text-white';
        case 'error': return 'bg-red-500 text-white';
        case 'warning': return 'bg-yellow-500 text-white';
        default: return 'bg-blue-500 text-white';
    }
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Smooth Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add(`animate-${animationType}`);
            }
        });
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Progress Tracking
let progressData = {
    sectionsVisited: new Set(),
    reflectionsCompleted: 0,
    interactionsCount: 0
};

function trackProgress(sectionId) {
    progressData.sectionsVisited.add(sectionId);
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const totalSections = 9;
    const visitedSections = progressData.sectionsVisited.size;
    const progressPercentage = (visitedSections / totalSections) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

// Accessibility Functions
function setupAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add ARIA labels
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', 'Interactive element');
        }
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchContent(query);
        });
    }
}

function searchContent(query) {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const isMatch = content.includes(query);
        
        if (query === '' || isMatch) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Service Worker Registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Print Function
function printPage() {
    window.print();
}

// Export to PDF Function
function exportToPDF() {
    showNotification('Función de exportación a PDF próximamente disponible', 'info');
}

// Share Function
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Guía IA | GrupoO2',
            text: 'Descubre cómo aprovechar la Inteligencia Artificial en GrupoO2',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Enlace copiado al portapapeles', 'success');
    }
}

// Analytics (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Form Handling
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Información enviada correctamente', 'success');
    form.reset();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupAccessibility();
    optimizePerformance();
    animateOnScroll();
});

// Expose global functions
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleReflection = toggleReflection;
window.printPage = printPage;
window.exportToPDF = exportToPDF;
window.shareContent = shareContent;

function setupAILab() {
    const summarizeBtn = document.getElementById('summarizeBtn');
    const improveBtn = document.getElementById('improveBtn');
    const outputPanel = document.getElementById('outputPanel');
    const originalPlaceholder = '<span class="text-gray-500 italic">Aquí aparecerá la respuesta de la IA...</span>';

    if (!summarizeBtn) {
        // Si el botón no existe, no hacemos nada.
        return;
    }

    const summaryText = "Reunión sobre el reporte trimestral mañana a las 10am. Se requiere preparación sobre resultados y próximos pasos.";
    
    const improvedText = `
        <p class="mb-2"><strong>Asunto:</strong> Preparación para la Reunión de Revisión Trimestral de Mañana</p>
        <p class="mb-2">Estimado equipo,</p>
        <p class="mb-2">Este es un recordatorio cordial sobre nuestra reunión programada para mañana a las <strong>10:00 a.m.</strong>, en la que analizaremos el informe de resultados trimestrales.</p>
        <p class="mb-2">Para asegurar una sesión productiva, les solicito amablemente que asistan habiendo revisado los resultados y preparados para discutir los próximos pasos estratégicos.</p>
        <p>Agradezco de antemano su puntualidad y valiosa contribución.</p>
    `;

    function showLoader() {
        outputPanel.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center text-corporate-blue">
                <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p class="font-semibold">Procesando solicitud...</p>
            </div>
        `;
    }

    summarizeBtn.addEventListener('click', () => {
        showLoader();
        setTimeout(() => {
            outputPanel.innerHTML = `<p class="text-gray-700">${summaryText}</p>`;
        }, 2000); // Simula 2 segundos
    });

    improveBtn.addEventListener('click', () => {
        showLoader();
        setTimeout(() => {
            outputPanel.innerHTML = `<div class="text-gray-700 text-left">${improvedText}</div>`;
        }, 2500); // Simula 2.5 segundos
    });
}
