import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in animation
    gsap.fromTo(section, 
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills stagger animation
    gsap.fromTo('.skill-icon',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image hover effect
    const handleImageHover = () => {
      gsap.to(imageRef.current, {
        rotationY: 10,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleImageLeave = () => {
      gsap.to(imageRef.current, {
        rotationY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const image = imageRef.current;
    if (image) {
      image.addEventListener('mouseenter', handleImageHover);
      image.addEventListener('mouseleave', handleImageLeave);
    }

    return () => {
      if (image) {
        image.removeEventListener('mouseenter', handleImageHover);
        image.removeEventListener('mouseleave', handleImageLeave);
      }
    };
  }, []);

  const skills = [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'WordPress', icon: '📝' },
    { name: 'UI/UX Design', icon: '🎯' },
    { name: 'Responsive Design', icon: '📱' },
    { name: 'GSAP', icon: '✨' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-primary p-1 glow-primary">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img
                    src="/kunal-profile.jpg"
                    alt="Kunal Bisen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary-glow rounded-full blur-sm float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-glow rounded-full blur-md float-delayed"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-glow">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full"></div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm a passionate web developer with expertise in creating modern, 
                responsive, and user-friendly digital experiences. My journey in web 
                development spans over several years, during which I've honed my skills 
                in both front-end technologies and design principles.
              </p>
              <p className="text-lg">
                I specialize in crafting pixel-perfect websites that not only look 
                stunning but also deliver exceptional performance and user experience. 
                From concept to deployment, I bring ideas to life with clean, efficient code.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="mt-12">
              <h3 className="text-2xl font-light mb-6 text-foreground">
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-lg text-center hover:glow-primary transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;