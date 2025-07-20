import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in
    gsap.fromTo(section,
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );

    // Portfolio cards stagger animation
    const cards = section.querySelectorAll('.portfolio-card');
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern online stores with secure payment gateways, inventory management, and user-friendly shopping experiences.",
      image: "/src/assets/ecommerce-portfolio-new.jpg",
      link: "#"
    },
    {
      id: 2,
      title: "Business Websites",
      description: "Professional corporate websites that establish credibility and showcase your brand with elegant design.",
      image: "/src/assets/business-portfolio-new.jpg",
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Websites",
      description: "Creative portfolio sites that beautifully showcase your work and help you stand out in your industry.",
      image: "/src/assets/portfolio-portfolio-new.jpg",
      link: "#"
    },
    {
      id: 4,
      title: "Blog or Magazine Websites",
      description: "Content-rich platforms with intuitive navigation, SEO optimization, and engaging reading experiences.",
      image: "/src/assets/blog-portfolio-new.jpg",
      link: "#"
    },
    {
      id: 5,
      title: "Education Websites",
      description: "Interactive learning platforms with course management, student portals, and educational content delivery.",
      image: "/src/assets/education-portfolio-new.jpg",
      link: "#"
    },
    {
      id: 6,
      title: "Web Applications / SaaS Websites",
      description: "Scalable software solutions with modern UI/UX, real-time features, and robust backend systems.",
      image: "/src/assets/saas-portfolio-new.jpg",
      link: "#"
    }
  ];

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our diverse range of web solutions, each crafted with precision and tailored to meet specific business needs.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={containerRef}>
          {portfolioItems.map((item) => (
            <div 
              key={item.id}
              className="portfolio-card group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <button className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium group-hover:shadow-lg group-hover:shadow-primary/25">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: `${portfolioItems.length * 280}px` }}>
            {portfolioItems.map((item) => (
              <div 
                key={item.id}
                className="portfolio-card flex-shrink-0 w-64 bg-card rounded-xl overflow-hidden shadow-lg border border-border/50"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-36 object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-xs leading-relaxed">
                    {item.description}
                  </p>
                  <button className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-xs font-medium w-full">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;