import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initial navigation animation
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        delay: 3.5, // After loading screen
        ease: "power2.out"
      }
    );

    // Logo rotation animation - faster clockwise rotation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 8, // Faster rotation - from 20 seconds to 8 seconds
        repeat: -1, // infinite rotation
        ease: "none" // linear rotation speed
      });
    }
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Video', href: '/#video' },
    { name: 'About', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/#contact' }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // Navigate to section on home page
      if (window.location.pathname !== '/') {
        window.location.href = href;
      } else {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Navigate to different page
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="nav-item flex items-center space-x-4">
            <a 
              href="/" 
              className="cursor-pointer flex items-center space-x-4"
            >
              {/* Enlarged Logo with Faster Rotation Animation */}
              <img 
                ref={logoRef}
                src="https://i.postimg.cc/qqHB65xn/20250731-160737-1.png" 
                alt="Kunal Bisen Logo" 
                className="w-16 h-16 object-contain"
              />
              {/* Kunal Bisen Text */}
              <span className="text-xl font-light text-glow">
                Kunal Bisen
              </span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="nav-item text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider text-sm"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="nav-item md:hidden relative w-8 h-8 flex flex-col justify-center space-y-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-30 glass transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`block text-3xl font-light text-foreground hover:text-primary transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;