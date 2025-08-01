import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const playSuccessSound = () => {
    try {
      // Create audio context for success sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a pleasant success sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a pleasant melody
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      let currentFreq = 0;
      
      const playNote = () => {
        if (currentFreq < frequencies.length) {
          oscillator.frequency.setValueAtTime(frequencies[currentFreq], audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          currentFreq++;
          setTimeout(playNote, 200);
        }
      };
      
      oscillator.start();
      playNote();
      
      setTimeout(() => {
        oscillator.stop();
      }, 1000);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  const showSuccessAnimation = () => {
    setShowSuccess(true);
    playSuccessSound();
    
    // Paper spreading animation
    gsap.fromTo('.success-modal', {
      scale: 0,
      opacity: 0,
      rotationY: -180
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Paper particles animation
    gsap.fromTo('.paper-particle', {
      scale: 0,
      opacity: 0,
      rotation: 0
    }, {
      scale: 1,
      opacity: 1,
      rotation: 360,
      duration: 1.2,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Text reveal animation
    gsap.fromTo('.success-text', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out"
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
      gsap.to('.success-modal', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => setShowSuccess(false)
      });
    }, 5000);
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
        // Reset form
        setFormData({
          name: '',
          email: '',
          profession: '',
          message: ''
        });

        // Show success animation and message
        showSuccessAnimation();

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

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to bring your project to life? Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-input">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-muted/20 focus:border-primary focus:outline-none transition-colors duration-300 bg-background/50 text-foreground placeholder-muted-foreground"
                  />
                </div>
                <div className="form-input">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-muted/20 focus:border-primary focus:outline-none transition-colors duration-300 bg-background/50 text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Your Profession"
                  className="w-full px-4 py-3 glass rounded-lg border border-muted/20 focus:border-primary focus:outline-none transition-colors duration-300 bg-background/50 text-foreground placeholder-muted-foreground"
                />
              </div>
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-lg border border-muted/20 focus:border-primary focus:outline-none transition-colors duration-300 bg-background/50 text-foreground placeholder-muted-foreground resize-none"
                ></textarea>
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
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
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
                <a href="https://github.com/kunalbisen56" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/kunal-bisen-330781365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/digital_with_kunal?igsh=MWwxc3A5NDVzY2xjMg==" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1B1yoqL7Qg/" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="success-modal relative bg-white rounded-3xl p-12 max-w-2xl mx-4 text-center shadow-2xl">
            {/* Paper Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="paper-particle absolute w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Success Content */}
            <div className="success-text relative z-10">
              <div className="mb-8">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-4">
                  Congratulations!
                </h3>
                <p className="text-2xl text-gray-600 mb-6">
                  Your Form has been Submitted
                </p>
                <p className="text-xl text-primary font-semibold">
                  We will Contact You Soon
                </p>
              </div>
              
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;