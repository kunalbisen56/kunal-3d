import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portfolioItems = [{
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern online stores with secure payment gateways and inventory management.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=95',
    category: 'E-Commerce',
    link: 'https://theloom.in/'
  }, {
    id: 2,
    title: 'Business Websites',
    description: 'Professional corporate websites that establish strong brand presence.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=95',
    category: 'Business',
    link: 'https://citizen.com/'
  }, {
    id: 3,
    title: 'Portfolio Websites',
    description: 'Creative portfolio sites that showcase work in stunning visual layouts.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=95',
    category: 'Portfolio',
    link: 'https://dribbble.com/shots/21719966-3D-Portfolio-Website'
  }, {
    id: 4,
    title: 'Blog/Magazine Websites',
    description: 'Content-rich platforms with engaging layouts and smooth reading experience.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=95',
    category: 'Blog',
    link: 'https://ruttl.com/blog/best-web-design-blogs/'
  }, {
    id: 5,
    title: 'Education Websites',
    description: 'Interactive learning platforms with course management and student portals.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=95',
    category: 'Education',
    link: 'https://blacksmith.agency/resources/web-design/best-university-website-examples/'
  }, {
    id: 6,
    title: 'Web Applications/SaaS',
    description: 'Scalable software solutions with user dashboards and advanced functionality.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=95',
    category: 'SaaS',
    link: 'https://www.butter.us/'
  }];
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in animation
    gsap.fromTo(section, {
      opacity: 0,
      filter: "blur(10px)"
    }, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Portfolio items stagger animation
    gsap.fromTo('.portfolio-item', {
      y: 50,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Hover animations for portfolio items
    const portfolioCards = section.querySelectorAll('.portfolio-item');
    portfolioCards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  const handleViewProject = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return <section ref={sectionRef} id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our diverse range of web solutions, each crafted with precision and 
            tailored to meet specific business needs.
          </p>
        </div>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map(item => <div key={item.id} className="portfolio-item glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500 cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/80 text-primary-foreground rounded-full text-xs font-medium backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {item.description}
                </p>
                <button 
                  onClick={() => handleViewProject(item.link)}
                  className="w-full py-3 btn-glow rounded-lg font-medium tracking-wider transition-all duration-300 hover:scale-105"
                >
                  View Project
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PortfolioSection;