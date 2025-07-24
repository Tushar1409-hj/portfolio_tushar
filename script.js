// Toggle dark mode


// Animate timeline lines when Experience & Education section comes into view
const experienceSection = document.getElementById('experience');
const timelineLines = document.querySelectorAll('.timeline-line');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            timelineLines.forEach(line => {
                line.classList.add('animate-timeline');
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (experienceSection) {
    observer.observe(experienceSection);
};

// Submit contact form with Formspree and show alert dropdown
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const alertDropdown = document.getElementById('alert-dropdown');
    const alertContent = document.getElementById('alert-content');

    // Hide previous alert
    alertDropdown.classList.add('hidden');

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            form.reset();
            alertContent.textContent = "Thank you! Your message has been sent.";
            alertContent.className = "mx-auto max-w-xl bg-green-600 text-white px-6 py-4 rounded-b-lg shadow-lg text-center font-semibold transition duration-300";
            alertDropdown.classList.remove('hidden');
        } else {
            alertContent.textContent = "Oops! Something went wrong. Please try again.";
            alertContent.className = "mx-auto max-w-xl bg-red-600 text-white px-6 py-4 rounded-b-lg shadow-lg text-center font-semibold transition duration-300";
            alertDropdown.classList.remove('hidden');
        }
    } catch {
        alertContent.textContent = "Oops! Something went wrong. Please try again.";
        alertContent.className = "mx-auto max-w-xl bg-red-600 text-white px-6 py-4 rounded-b-lg shadow-lg text-center font-semibold transition duration-300";
        alertDropdown.classList.remove('hidden');
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
        alertDropdown.classList.add('hidden');
    }, 3000);
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Show/hide back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (scrollPosition > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

// Back to top button
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(bar);
    });
};

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateSkillBars();
});
