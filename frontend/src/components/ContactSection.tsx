import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section animation
    gsap.fromTo(section, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Form inputs animation
    gsap.fromTo('.form-input', {
      x: -50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Submit button animation
    gsap.fromTo('.submit-btn', {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: formRef.current,
        start: "bottom 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Social icons animation
    gsap.fromTo('.social-icon', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit button animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    try {
      // Get backend URL from environment variables
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL not configured');
      }

      // Submit form data to backend API
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profession: formData.profession || null,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Show success toast
        toast({
          title: "Message Sent Successfully!",
          description: result.message || "Thank you for your message. I'll get back to you soon!",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          profession: '',
          message: ''
        });

        // Success animation
        gsap.to('.submit-btn', {
          backgroundColor: '#10b981',
          duration: 0.3,
          ease: "power2.out"
        });

        setTimeout(() => {
          gsap.to('.submit-btn', {
            backgroundColor: 'original',
            duration: 0.3,
            ease: "power2.out"
          });
        }, 2000);

      } else {
        throw new Error(result.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Show error toast
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
        variant: "destructive"
      });

      // Error animation
      gsap.to('.submit-btn', {
        backgroundColor: '#ef4444',
        duration: 0.3,
        ease: "power2.out"
      });

      setTimeout(() => {
        gsap.to('.submit-btn', {
          backgroundColor: 'original',
          duration: 0.3,
          ease: "power2.out"
        });
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section ref={sectionRef} id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-glow font-medium text-[#945df1] md:text-6xl">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6 bg-white"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-input">
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 glass rounded-lg border border-muted/30 focus:border-primary/60 focus:outline-none focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground" placeholder="Your Name" />
            </div>

            <div className="form-input">
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 glass rounded-lg border border-muted/30 focus:border-primary/60 focus:outline-none focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground" placeholder="your.email@example.com" />
            </div>

            <div className="form-input">
              <label htmlFor="profession" className="block text-sm font-medium text-muted-foreground mb-2">
                Profession
              </label>
              <input type="text" id="profession" name="profession" value={formData.profession} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border border-muted/30 focus:border-primary/60 focus:outline-none focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground" placeholder="Your Profession" />
            </div>

            <div className="form-input">
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Message
              </label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-3 glass rounded-lg border border-muted/30 focus:border-primary/60 focus:outline-none focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground resize-none" placeholder="Tell me about your project..." />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`submit-btn w-full py-4 btn-glow rounded-lg font-medium tracking-wider transition-all duration-300 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'pulse-glow hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-medium mb-4 text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a project in mind or just want to say hello? Drop me a message 
                and I'll get back to you as soon as possible. I'm always excited to 
                work on new and challenging projects.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-medium mb-4 text-foreground">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-glow rounded-full blur-sm float opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary-glow rounded-full blur-md float-delayed opacity-40"></div>
      </div>
    </section>;
};
export default ContactSection;