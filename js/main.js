// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const isActive = mobileNav.classList.contains('active');
            
            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (isActive) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form to WhatsApp
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value || '';
            const phone = document.getElementById('phone').value || '';
            const email = document.getElementById('email').value || '';
            const date = document.getElementById('date').value || '';
            const location = document.getElementById('location').value || '';
            const service = document.getElementById('service').value || '';
            const message = document.getElementById('message').value || '';

            let text = `*New Wedding Enquiry!*\n\n`;
            text += `*Name:* ${name}\n`;
            text += `*Phone:* ${phone}\n`;
            text += `*Email:* ${email}\n`;
            if(date) text += `*Date:* ${date}\n`;
            if(location) text += `*Location:* ${location}\n`;
            if(service) text += `*Service:* ${service}\n`;
            if(message) text += `*Message:* ${message}\n`;

            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/919526193993?text=${encodedText}`, '_blank');
        });
    }
});
