
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 
    'Node.js', 'Next.js', 'Tailwind CSS',
    'GraphQL', 'AWS', 'Git'
  ];
  const content = [
    "Innovative and results-driven Full-Stack Developer with 3+ years of experience designing and deploying scalable web applications using Python, ReactJS, FastAPI, and PostgreSQL.",
    "Proven expertise in building RESTful APIs, optimizing database performance, and deploying applications using Docker and AWS.",
    "Adept at leveraging cutting-edge technologies to solve complex problems and deliver user-centric solutions.",
    "Passionate about continuous learning and contributing to impactful projects, with a strong foundation in AI/ML and cloud computing.",
    "Recognized for leadership, teamwork, and technical excellence in both academic and professional settings."
  ];
  return (
    <section id="about" className="section-container">
      <div>
        <h2 className="heading-md mb-8">
          About Me
        </h2>
        
        <div className="grid grid-cols-1  gap-10">
          <div className="md:col-span-3 space-y-4">
              {content.map((paragraph, index) => (
                <p key={index} className="paragraph">
                  {paragraph}
                </p>
             ))}
            
            
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center text-slate">
                  <span className="text-primary mr-2">▹</span> {skill}
                </li>
              ))}
            </ul>
            
            <div className="pt-8">
              <a href="#projects">
                <Button
                  className="bg-primary text-white hover:bg-primary/90 px-7 py-6 text-base"
                >
                  View my projects
                </Button>
              </a>
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
