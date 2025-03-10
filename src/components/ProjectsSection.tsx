
import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'QuickEntry',
      description: 'students to enter rooms by scanning QR codes, making the entry process faster and eliminating long queues.',
      tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Redux', 'MongoDB'],
      links: {
        github: 'https://github.com/manojavula08?tab=repositories',
        external: '#',
      },
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'An admin dashboard for e-commerce platforms with sales analytics, product management, and customer insights. Built with modern web technologies.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: {
        github: '#',
        external: '#',
      },
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Weather Application',
      description: 'A beautiful weather app that provides current conditions and forecasts with a clean UI. Uses weather APIs and geolocation.',
      tags: ['JavaScript', 'CSS', 'Weather API'],
      links: {
        github: '#',
        external: '#',
      },
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80'
    },
  ];

  // Create a ref for each project card
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set up intersection observer for project cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Once the animation is complete, we can unobserve
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe all project cards
    projectRefs.current.forEach((project) => {
      if (project) {
        observer.observe(project);
      }
    });

    return () => {
      projectRefs.current.forEach((project) => {
        if (project) {
          observer.unobserve(project);
        }
      });
    };
  }, []);

  return (
    <section id="projects" className="section-container">
      <div>
        <h2 className="heading-md mb-12">
          Projects I've Built
        </h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={(el) => (projectRefs.current[index] = el)}
              className="transition-all duration-300 hover:-translate-y-2 rounded-xl overflow-hidden shadow-md hover:shadow-xl opacity-0 transform translate-x-[-30px]"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Project Image/Preview - Using custom project images */}
                <div className="w-full lg:w-1/2 h-80 flex items-center justify-center p-8 bg-cover bg-center" 
                     style={{ backgroundImage: `url(${project.image})`, 
                             backgroundBlendMode: 'overlay', 
                             backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                  <div className="w-full h-full rounded-lg border border-slate-200 bg-white/90 p-6 shadow-sm flex flex-col">
                    <div className="text-center flex-1 flex items-center justify-center">
                      <h4 className="text-2xl font-semibold text-gray-800">{project.title}</h4>
                    </div>
                    <div className="mt-auto flex justify-center">
                      <div className="flex gap-4">
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="hover:scale-105 transition-transform">
                          Live
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="hover:scale-105 transition-transform hover:bg-slate-100">
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="w-full lg:w-1/2 p-8 bg-white">
                  <h3 className="text-3xl font-bold text-primary mb-6">
                    {project.title}
                  </h3>
                  
                  <div className="prose text-slate max-w-none mb-6">
                    <p className="text-lg">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-4 py-1 rounded-full text-sm bg-slate-100 text-slate-dark hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-5">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-dark hover:text-primary transition-colors duration-300 hover:scale-110 group"
                      >
                        <Github className="group-hover:fill-primary" size={22} />
                      </a>
                    )}
                    {project.links.external && (
                      <a 
                        href={project.links.external} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-dark hover:text-primary transition-colors duration-300 hover:scale-110"
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* "View More Projects" section */}
        <div className="mt-20 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">And Many More</h3>
          <div className="w-20 h-1 bg-[#41644A] mb-10"></div>
          
          <a 
            href="https://github.com/manojavula08?tab=repositories" 
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-10 py-4 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Github size={20} className="text-[#e76f51] group-hover:fill-[#41644A]" />
            <span className="text-lg text-[#41644A]">View More on Github</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
