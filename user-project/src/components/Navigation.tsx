import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      // Navigation to different page
      window.location.href = href;
    } else {
      // Scroll to section on current page
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="nav-item flex items-center space-x-3">
            <a 
              href="#hero" 
              className="text-2xl font-light text-glow cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              KB
            </a>
            <span className="text-lg font-light text-muted-foreground hidden sm:block">
              Kunal Bisen
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
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
                onClick={() => scrollToSection(item.href)}
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