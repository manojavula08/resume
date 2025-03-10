
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Detect scroll direction for hiding/showing navbar
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
      
      // Detect if page is scrolled for styling changes
      setIsScrolled(currentScrollPos > 50);
      
      // Determine active section based on scroll position with intersection observer
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && currentScrollPos >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Setup Intersection Observer for smoother section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [prevScrollPos]);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClickResume = () => {
    window.open('https://drive.google.com/file/d/1P24bLTIqy_HLbm3ed8SOJRniynar4P1k/view?usp=sharing', '_blank');
  };

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12',
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    )}>
      <nav className="max-w-5xl mx-auto flex justify-between items-center">
        <a 
          href="#home" 
          onClick={scrollToSection('home')}
          className="text-primary text-xl font-bold transition-all duration-300 hover:scale-105"
        >
          <span className="text-primary">{'<'}</span>
          Portfolio
          <span className="text-primary">{'/>'}</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollToSection(item.id)}
              className={cn(
                'nav-link relative font-mono text-slate-900 text-sm transition-all duration-300 hover:text-primary',
                'after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0',
                'after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300',
                'hover:after:scale-x-100 hover:after:origin-bottom-left',
                activeSection === item.id ? 'text-primary after:scale-x-100' : 'text-slate'
              )}
            >
              {item.label}
            </a>
          ))}
          <Button 
            onClick={handleClickResume} 
            className="bg-primary text-white hover:bg-emerald-800 hover:scale-105 transition-all duration-300 border border-primary/50 relative overflow-hidden group"
          >
            <span className="relative z-10">Resume</span>
            <span className="absolute inset-0 bg-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </Button>
        </div>
        
        {/* Mobile menu button would go here */}
      </nav>
    </header>
  );
};

export default Navigation;
