import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Globe, ShoppingCart, Settings, Rocket } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import useClickSound from '@/hooks/useClickSound';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const playSound = useClickSound();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Hero section animation
    gsap.fromTo('.hero-content',
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3
      }
    );

    // Service cards stagger animation
    const cards = section.querySelectorAll('.service-card');
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
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.services-grid',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );

    // CTA section animation
    gsap.fromTo('.cta-section',
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
          trigger: '.cta-section',
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: Code,
      title: "Website Design & Development",
      description: "Crafting modern, responsive websites tailored to your brand's identity and goals.",
      features: ["Responsive Design", "Custom Development", "SEO Optimized", "Fast Loading"]
    },
    {
      id: 2,
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing smooth and intuitive user experiences to boost user satisfaction and engagement.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      id: 3,
      icon: Globe,
      title: "WordPress Development",
      description: "Customized WordPress websites that are scalable, fast, and easy to manage.",
      features: ["Custom Themes", "Plugin Development", "Performance Optimization", "Security Setup"]
    },
    {
      id: 4,
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Building secure, fast-loading online stores to help you sell more efficiently.",
      features: ["Shopping Cart", "Payment Integration", "Inventory Management", "Analytics"]
    },
    {
      id: 5,
      icon: Settings,
      title: "Website Maintenance",
      description: "Regular updates, backups, and monitoring to keep your site running smoothly and securely.",
      features: ["Regular Updates", "Security Monitoring", "Backup Services", "Performance Optimization"]
    },
    {
      id: 6,
      icon: Rocket,
      title: "Complete Website Setup Assistance",
      description: "From domain and hosting to final launch – we handle everything to get your site live hassle-free.",
      features: ["Domain Setup", "Hosting Configuration", "SSL Installation", "Launch Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main ref={sectionRef}>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="hero-content text-center">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We offer comprehensive web solutions to help your business thrive online. 
                From design to development and ongoing maintenance, we've got you covered.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.id}
                    className="service-card group bg-card rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20"
                    onClick={playSound}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto">
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Build Your Website Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to take your business online? Get in touch with us and let's discuss 
              how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium text-lg hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started Now
              </button>
              <button 
                onClick={() => {
                  const portfolioSection = document.getElementById('portfolio');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#portfolio';
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-300 font-medium text-lg"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;