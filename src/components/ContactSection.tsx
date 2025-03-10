import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { socialMediaLinks } from '@/utils/socialMediaLinks';

const ContactSection = () => {
  return (
    <section id="contact" className="section-container">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="heading-md">Get In Touch</h2>
        
        <p className="paragraph text-center mx-auto mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
        </p>
        
        <Button
          className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-base"
          onClick={() => window.location.href = socialMediaLinks.email}
        >
          <Mail className="mr-2 h-5 w-5" /> Say Hello
        </Button>
        
        <div className="mt-16 flex justify-center space-x-8">
          <a
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-primary transition-colors duration-300 hover:scale-125"
          >
            <Github size={24} />
          </a>
          <a
            href={socialMediaLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-primary transition-colors duration-300 hover:scale-125"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={socialMediaLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-primary transition-colors duration-300 hover:scale-125"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
