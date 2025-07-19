import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ThreeScene from './ThreeScene';
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 4
    }); // After loading screen

    // Set initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
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
    }, "-=0.4");

    // Floating animation for background elements
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // CTA hover animation
    const handleCTAHover = () => {
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const handleCTALeave = () => {
      gsap.to(ctaRef.current, {
        scale: 1,
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
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <h1 className="text-4xl lg:text-8xl leading-tight font-bold text-center md:text-5xl">
            Hi, I'm{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Kunal Bisen
            </span>
          </h1>
        </div>

        <div ref={subtitleRef} className="mb-10">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about crafting modern, responsive, and user-focused websites. With 4 years of experience, I blend creativity with technical expertise to deliver high-performance web solutions.
          </p>
        </div>

        <button ref={ctaRef} onClick={scrollToContact} className="btn-glow px-8 py-4 rounded-full text-lg font-medium tracking-wider pulse-glow text-indigo-50 bg-purple-800 hover:bg-purple-700">
          Hire Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;