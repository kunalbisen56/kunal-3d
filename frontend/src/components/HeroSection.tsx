import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ThreeScene from './ThreeScene';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 }); // After loading screen

    // Set initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current, videoRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });

    // Animate elements in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out"
    }).to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6").to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4").to(videoRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");

    // Floating animation for background elements
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // Enhanced CTA hover animations
    const handleCTAHover = () => {
      gsap.to(ctaRef.current, {
        scale: 1.1,
        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };
    
    const handleCTALeave = () => {
      gsap.to(ctaRef.current, {
        scale: 1,
        boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const cta = ctaRef.current;
    if (cta) {
      cta.addEventListener('mouseenter', handleCTAHover);
      cta.addEventListener('mouseleave', handleCTALeave);
    }

    return () => {
      if (cta) {
        cta.removeEventListener('mouseenter', handleCTAHover);
        cta.removeEventListener('mouseleave', handleCTALeave);
      }
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js 3D Background */}
      <ThreeScene />

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-background/20"></div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-orb absolute top-1/4 left-1/4 w-4 h-4 bg-primary-glow rounded-full blur-md opacity-60"></div>
        <div className="hero-orb absolute top-2/3 right-1/4 w-6 h-6 bg-secondary-glow rounded-full blur-lg opacity-40"></div>
        <div className="hero-orb absolute bottom-1/3 left-2/3 w-3 h-3 bg-accent-glow rounded-full blur-sm opacity-80"></div>
        <div className="hero-orb absolute top-1/2 right-1/2 w-2 h-2 bg-primary-glow rounded-full blur-sm opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto -mt-20">
        <div ref={headlineRef} className="mb-6">
          <h1 className="text-4xl lg:text-8xl leading-tight font-bold text-center md:text-6xl">
            Hi, I'm{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Kunal Bisen
            </span>
          </h1>
        </div>

        <div ref={subtitleRef} className="mb-10">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed md:text-base">
            Passionate about crafting modern, responsive, and user-focused websites. With 4 years of experience, I blend creativity with technical expertise to deliver high-performance web solutions.
          </p>
        </div>

        <button 
          ref={ctaRef} 
          onClick={scrollToContact} 
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-full text-lg tracking-wider transition-all duration-300 shadow-lg hover:shadow-purple-500/25 overflow-hidden mb-12"
        >
          {/* Button Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
          
          {/* Button Text */}
          <span className="relative z-10 flex items-center space-x-2">
            <span>Hire Me</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>
        </button>

        {/* Introduction Video Frame */}
        <div ref={videoRef} className="w-full max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <div className="absolute inset-0 glass rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer group">
                    <svg 
                      className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Introduction Video</h3>
                  <p className="text-muted-foreground text-sm">Get to know more about my work and approach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;