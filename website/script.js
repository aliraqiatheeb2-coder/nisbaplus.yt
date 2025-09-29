// JavaScript for Nisba+ Website

// Language translations
const translations = {
    ar: {
        // Navigation
        'Features': 'الميزات',
        'Screenshots': 'لقطات الشاشة',
        'Download': 'تحميل',
        
        // Hero Section
        'Your Journey to a': 'رحلتك إلى',
        'Better Life': 'حياة أفضل',
        'Starts Here': 'تبدأ من هنا',
        'Transform your daily routine with powerful habit tracking, smart task management, and focus-enhancing Pomodoro technique. Experience productivity like never before with beautiful animations and motivating sound effects.': 'حول روتينك اليومي مع تتبع العادات القوي وإدارة المهام الذكية وتقنية بومودورو لتعزيز التركيز. جرب الإنتاجية كما لم تكن من قبل مع الرسوم المتحركة الجميلة والتأثيرات الصوتية المحفزة.',
        'Download Now': 'تحميل الآن',
        'Live Demo': 'عرض تجريبي',
        'Good Evening': 'مساء الخير',
        'Daily Exercise': 'التمرين اليومي',
        'Read Book': 'قراءة كتاب',
        'Pomodoro Session': 'جلسة بومودورو',
        
        // Features Section
        'Powerful Features': 'ميزات قوية',
        'Everything you need to build better habits, manage tasks efficiently, and stay focused on your goals.': 'كل ما تحتاجه لبناء عادات أفضل وإدارة المهام بكفاءة والبقاء مركزًا على أهدافك.',
        'Smart Task Management': 'إدارة المهام الذكية',
        'Organize your tasks with intelligent categorization, priority levels, and due dates. Never miss an important deadline again.': 'نظم مهامك مع تصنيف ذكي ومستويات أولوية وتواريخ استحقاق. لا تفوت موعدًا نهائيًا مهمًا.',
        'Habit Tracking': 'تتبع العادات',
        'Build positive habits with streak tracking, progress visualization, and gentle reminders that keep you motivated.': 'ابنِ عادات إيجابية مع تتبع السلسلة وتصور التقدم وتذكيرات لطيفة تبقيك متحفزًا.',
        'Focus Pomodoro': 'بومودورو للتركيز',
        'Boost productivity with the proven Pomodoro technique. Work in focused intervals with customizable timers and breaks.': 'عزز الإنتاجية مع تقنية بومودورو المثبتة. اعمل في فترات مركز مع مؤقتات وفترات راحة قابلة للتخصيص.',
        'Progress Analytics': 'تحليلات التقدم',
        'Visualize your productivity with detailed statistics, charts, and insights that help you understand your patterns.': 'صور إنتاجيتك مع إحصائيات مفصلة ومخططات ورؤى تساعدك على فهم أنماطك.',
        'Gentle Motivation': 'تحفيز لطيف',
        'Stay motivated with beautiful animations, encouraging sound effects, and positive reinforcement for your achievements.': 'ابقَ متحفزًا مع رسوم متحركة جميلة وتأثيرات صوتية محفزة وتعزيز إيجابي لإنجازاتك.',
        'Privacy Focused': 'الخصوصية في المقدمة',
        'Your data stays private and secure. No ads, no tracking, no data selling. Just pure productivity tools.': 'تبقى بياناتك خاصة وآمنة. لا إعلانات، لا تتبع، لا بيع للبيانات. مجرد أدوات إنتاجية نقية.',
        
        // Stats Section
        'Active Users': 'مستخدمين نشطين',
        'Tasks Completed': 'مهمة مكتملة',
        'Habits Tracked': 'عادة متتبعة',
        'Uptime': 'وقت التشغيل',
        
        // Screenshots Section
        'Beautiful Interface': 'واجهة جميلة',
        'Experience a clean, modern design that makes productivity enjoyable and engaging.': 'جرب تصميمًا نظيفًا وحديثًا يجعل الإنتاجية ممتعة وجذابة.',
        'Task Management': 'إدارة المهام',
        'Progress Tracking': 'تتبع التقدم',
        'Pomodoro Timer': 'مؤقت بومودورو',
        
        // Download Section
        'Get Started Today': 'ابدأ اليوم',
        'Join thousands of users who have transformed their productivity with Nisba+.': 'انضم إلى آلاف المستخدمين الذين حولوا إنتاجيتهم مع Nisba+.',
        'Download for Android': 'تحميل للأندرويد',
        'iOS - Coming Soon': 'iOS - قريباً',
        'Web - Coming Soon': 'الويب - قريباً',
        'Available for free on all platforms. No ads. No subscriptions.': 'متاح مجانًا على جميع المنصات. لا إعلانات. لا اشتراكات.',
        
        // Footer
        'Product': 'المنتج',
        'Pricing': 'التسعير',
        'Roadmap': 'خريطة الطريق',
        'Support': 'الدعم',
        'Help Center': 'مركز المساعدة',
        'Contact Us': 'اتصل بنا',
        'Privacy Policy': 'سياسة الخصوصية',
        'Terms of Service': 'شروط الخدمة',
        'All rights reserved. Made with ❤️ for productivity enthusiasts.': 'جميع الحقوق محفوظة. صُنع بـ ❤️ لمحبي الإنتاجية.',
        
        // Other
        'Nisba+': 'نسبا+'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const navLinks = document.querySelector('.md\\:flex');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('hidden');
                navLinks.classList.toggle('flex');
                navLinks.classList.toggle('flex-col');
                navLinks.classList.toggle('absolute');
                navLinks.classList.toggle('top-16');
                navLinks.classList.toggle('left-0');
                navLinks.classList.toggle('w-full');
                navLinks.classList.toggle('bg-gray-900');
                navLinks.classList.toggle('py-4');
                navLinks.classList.toggle('glass-effect');
            }
        });
    }
    
    // Language Toggle
    const languageToggle = document.getElementById('language-toggle');
    const langEn = document.querySelector('.lang-en');
    const langAr = document.querySelector('.lang-ar');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // Toggle language display
            langEn.classList.toggle('hidden');
            langAr.classList.toggle('hidden');
            
            // Get current language
            const currentLang = langEn.classList.contains('hidden') ? 'ar' : 'en';
            
            // Update all translatable elements
            updateLanguage(currentLang);
        });
    }
    
    // Function to update language
    function updateLanguage(lang) {
        if (lang === 'ar') {
            // Apply Arabic translations
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations.ar[key]) {
                    element.textContent = translations.ar[key];
                }
            });
            
            // Update HTML direction
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            // Apply English (default)
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                // Reset to original content (you might want to store original content differently)
                element.textContent = element.getAttribute('data-original') || element.textContent;
            });
            
            // Update HTML direction
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinksAnchors = document.querySelectorAll('a[href^="#"]');
    
    navLinksAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && !navLinks.classList.contains('hidden')) {
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-gray-900', 'py-4', 'glass-effect');
                }
            }
        });
    });
    
    // Particle Animation Enhancement
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random emoji content
        const emojis = ['⭐', '🎯', '✨', '🚀', '💫', '🌟', '🔥', '⚡'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        document.querySelector('.floating-elements').appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 300);
    }
    
    // Create new particles periodically
    setInterval(createParticle, 2000);
    
    // Download Button Animation
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('floating-animation');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('floating-animation');
        });
    });
    
    // Form Submission Handling (if there were forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would handle form submission here
            // For now, we'll just show an alert
            alert('Thank you for your submission! In a real implementation, this would be sent to our servers.');
            form.reset();
        });
    });
    
    // Feature Card Hover Effects Enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Dynamic Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Window Load Event
window.addEventListener('load', function() {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initialize any additional libraries or features
    console.log('Nisba+ Website Loaded Successfully');
});