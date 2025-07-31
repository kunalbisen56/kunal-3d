import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Globe, ShoppingCart, Settings, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

    // Hero content animation
    gsap.fromTo('.services-hero-content',
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
          trigger: '.services-hero-content',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
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
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA section animation
    gsap.fromTo('.services-cta-section',
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
          trigger: '.services-cta-section',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="services-hero-content text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive web solutions to help your business thrive online. 
            From design to development and ongoing maintenance, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="service-card group glass rounded-xl p-8 hover:glow-primary transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
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

        {/* CTA Section */}
        <div className="services-cta-section text-center glass p-12 rounded-2xl">
          <h3 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Let's Build Your Website Today
          </h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Ready to take your business online? Get in touch with us and let's discuss 
            how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-8 py-3 btn-glow rounded-lg font-medium text-lg hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </button>
            <button 
              onClick={scrollToPortfolio}
              className="inline-flex items-center justify-center px-8 py-3 glass rounded-lg hover:glow-primary transition-all duration-300 font-medium text-lg text-foreground"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;