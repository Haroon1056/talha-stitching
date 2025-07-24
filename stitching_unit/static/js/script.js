// Navbar scroll effect and active section tracking
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  
  // Navbar scroll effect
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.add('bg-dark');
      navbar.classList.remove('navbar-dark');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('bg-dark');
      navbar.classList.add('navbar-dark');
    }
  }

  // Initialize Bootstrap collapse
  const navbarCollapse = new bootstrap.Collapse(document.getElementById('navbarNav'), {
    toggle: false
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar') && !event.target.closest('.navbar-toggler')) {
      navbarCollapse.hide();
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse._element.classList.contains('show')) {
        navbarCollapse.hide();
      }
    });
  });

  // Active nav link tracking
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = 'home'; // Default to home
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // About section background effect
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    window.addEventListener('scroll', function() {
      const sectionTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        aboutSection.style.backgroundPosition = `center ${-sectionTop * 0.2}px`;
      }
    });
  }

  // Golden particles effect
  const finalParagraph = document.querySelector('.delay-4');
  if (finalParagraph) {
    finalParagraph.addEventListener('mouseenter', createParticles);
  }

  function createParticles() {
    const rect = this.getBoundingClientRect();
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'gold-particle';
      particle.style.left = `${rect.left + Math.random() * rect.width}px`;
      particle.style.top = `${rect.top + Math.random() * rect.height}px`;
      
      particlesContainer.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        particle.style.opacity = '0.8';
        particle.style.transform = 'scale(1.5)';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        
        setTimeout(() => {
          particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
          particle.style.opacity = '0';
          
          // Remove particles after animation
          setTimeout(() => {
            particlesContainer.remove();
          }, 800);
        }, 100);
      }, i * 100);
    }
  }

  // Animated counters for Experience section
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // Initialize counters when Experience section is in view
  const experienceSection = document.getElementById('experience');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(experienceSection);
    }
  }, { threshold: 0.5 });

  if (experienceSection) {
    observer.observe(experienceSection);
  }

  // Gallery "View More" functionality
  const viewMoreBtn = document.querySelector('.view-more-btn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
      // This would be replaced with actual logic to load more images
      alert('More gallery items would load here in a real implementation');
    });
  }

  // Initialize scroll events
  window.addEventListener('scroll', function() {
    updateNavbar();
    updateActiveNav();
  });

  // Initial setup
  updateNavbar();
  updateActiveNav();
});


// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
});

// Smooth scroll for footer links
document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});