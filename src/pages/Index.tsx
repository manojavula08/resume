
import { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { socialMediaLinks } from '@/utils/socialMediaLinks';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Add delay to elements with staggered animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((element, index) => {
      const delay = 0.1 + index * 0.1;
      element.setAttribute('style', `animation-delay: ${delay}s`);
    });

    // Section fade-in on scroll
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Add fade-in class when element is visible
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Once the animation is complete, we can unobserve
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      // Observe all sections and elements that should animate on scroll
      document.querySelectorAll('.section-container').forEach(el => {
        observer.observe(el);
      });
    };

    // Implement lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy-load-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        const image = img as HTMLImageElement;
        if (image.dataset.src) {
          image.src = image.dataset.src;
          image.classList.add('loaded');
        }
      });
    }

    // Setup smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Initialize animations after a small delay
    setTimeout(observeElements, 300);

    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className={`min-h-screen bg-background relative transition-opacity duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      
      <main ref={sectionsRef} className="scroll-container">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Fixed email on the right side */}
      <div className="fixed right-10 bottom-0 hidden lg:flex flex-col items-center z-10">
        <a 
          href="mailto:manojreddyavula896@gmail.com" 
          className="font-mono text-slate hover:text-orange-600 transition-colors duration-300 tracking-widest my-6 vertical-text"
          style={{ writingMode: 'vertical-rl' }}
        >
          manojreddyavula896@gmail.com
        </a>
        <div className="w-px h-24 bg-slate"></div>
      </div>
      
      {/* Fixed social icons on the left side with enhanced hover effects */}
      <div className="fixed left-10 bottom-0 hidden lg:flex flex-col items-center z-10">
        <div className="flex flex-col space-y-6 mb-6">
          <a href={socialMediaLinks.twitter} target='_blank' className="hover:scale-125 text-slate hover:text-orange-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href={socialMediaLinks.linkedin} target="_blank" className="text-slate hover:scale-125 hover:text-orange-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href={socialMediaLinks.github} target="_blank" className="text-slate hover:scale-125 hover:text-orange-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
        <div className="w-px h-24 bg-slate"></div>
      </div>
    </div>
  );
};

export default Index;
