<script>
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
</script>