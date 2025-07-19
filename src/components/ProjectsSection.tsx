import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in
    gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo('.project-card',
      { scale: 0.8, opacity: 0, y: 60 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Horizontal scroll for mobile
    const setupHorizontalScroll = () => {
      if (window.innerWidth < 768) {
        const container = containerRef.current;
        if (container) {
          gsap.to(container, {
            x: () => -(container.scrollWidth - container.offsetWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: () => `+=${container.scrollWidth - container.offsetWidth}`,
              scrub: 1,
              pin: false
            }
          });
        }
      }
    };

    setupHorizontalScroll();
    window.addEventListener('resize', setupHorizontalScroll);

    return () => {
      window.removeEventListener('resize', setupHorizontalScroll);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web",
      description: "A cutting-edge web application featuring immersive 3D elements and smooth interactions.",
      image: "/lovable-uploads/b95a0c22-b036-42fa-aac5-34061be6ab53.png",
      tech: ["React", "Three.js", "GSAP"],
      link: "#"
    },
    {
      id: 2,
      title: "Gaming UI Interface",
      description: "Next-level gaming interface with advanced animations and responsive design.",
      image: "/lovable-uploads/d1c1a36d-1dec-4c67-90a7-2ac8512ca585.png",
      tech: ["React", "CSS3", "JavaScript"],
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Modern 3D portfolio showcasing creative development skills and projects.",
      image: "/lovable-uploads/d4b11556-3d0e-4b89-89a9-c09a4145e69a.png",
      tech: ["HTML5", "CSS3", "Spline"],
      link: "#"
    },
    {
      id: 4,
      title: "Gaming Platform",
      description: "Vibrant gaming website with animated characters and engaging user experience.",
      image: "/lovable-uploads/2d970417-e7ee-4d55-a1af-9ea50af0b985.png",
      tech: ["React", "Animation", "UI/UX"],
      link: "#"
    },
    {
      id: 5,
      title: "Animation Showcase",
      description: "Professional animation tools and techniques demonstration platform.",
      image: "/lovable-uploads/e0e75777-5db0-4aa7-b413-ee5a8b256571.png",
      tech: ["GSAP", "CSS3", "JavaScript"],
      link: "#"
    },
    {
      id: 6,
      title: "Portfolio Tutorial",
      description: "Step-by-step animated portfolio creation with modern design principles.",
      image: "/lovable-uploads/4a7a275c-6a44-4273-be59-450a84e74878.png",
      tech: ["React", "GSAP", "Tutorial"],
      link: "#"
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-glow">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work in web development, featuring innovative designs 
            and cutting-edge technologies.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass p-6 rounded-2xl hover:glow-primary transition-all duration-500 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted/30 text-xs rounded-full text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="w-full py-2 px-4 glass border border-primary/30 rounded-lg text-sm hover:bg-primary/10 hover:border-primary/60 transition-all duration-300">
                View Project
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div ref={containerRef} className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-80 glass p-6 rounded-2xl snap-center"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <h3 className="text-xl font-medium mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted/30 text-xs rounded-full text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="w-full py-2 px-4 glass border border-primary/30 rounded-lg text-sm">
                View Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;