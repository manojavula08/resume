
import { useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footerRef.current?.classList.add('animate-in');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="py-8 text-center text-slate-dark"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm font-mono relative inline-block overflow-hidden group">
          <span className="relative z-10 transition-all duration-300 group-hover:text-primary">
            Designed & Built with 
            <span className="text-red-500 animate-pulse mx-1">❤️</span>
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </p>
        <p className="text-xs mt-2 transition-colors duration-300 hover:text-primary">
          © {new Date().getFullYear()} Manoj Avula
        </p>
      </div>
    </footer>
  );
};

export default Footer;
