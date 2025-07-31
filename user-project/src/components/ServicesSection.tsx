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

  const services = [
    {
      id: 1,
      icon: Code,
      title: "Website Design & Development",
      description: "Crafting modern, responsive websites tailored to your brand's identity and goals."
    },
    {
      id: 2,
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing smooth and intuitive user experiences to boost user satisfaction and engagement."
    },
    {
      id: 3,
      icon: Globe,
      title: "WordPress Development",
      description: "Customized WordPress websites that are scalable, fast, and easy to manage."
    },
    {
      id: 4,
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Building secure, fast-loading online stores to help you sell more efficiently."
    },
    {
      id: 5,
      icon: Settings,
      title: "Website Maintenance",
      description: "Regular updates, backups, and monitoring to keep your site running smoothly and securely."
    },
    {
      id: 6,
      icon: Rocket,
      title: "Complete Website Setup Assistance",
      description: "From domain and hosting to final launch – we handle everything to get your site live hassle-free."
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We offer comprehensive web solutions to help your business thrive online with modern, efficient, and scalable websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="service-card group bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;