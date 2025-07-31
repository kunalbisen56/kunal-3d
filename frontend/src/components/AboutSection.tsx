import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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

    // Image animation
    gsap.fromTo(imageRef.current, {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Content animation
    gsap.fromTo(contentRef.current, {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Skills stagger animation
    gsap.fromTo('.skill-icon', {
      scale: 0,
      opacity: 0
    }, {
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
    });

    // Experience badge floating animation
    gsap.to(badgeRef.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

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

  // Function to scroll to contact section
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    {
      name: 'HTML5',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#e34f26" d="M3.345 21.601L1.419 0h21.162l-1.926 21.601L11.985 24l-8.64-2.399z"/>
          <path fill="#ef652a" d="M12 22.164l6.995-1.939L20.52 2.281H12v19.883z"/>
          <path fill="#ebebeb" d="M12 9.688H8.78l-.251-2.812H12V4.125H5.391l.066.738.675 7.562H12V9.688zM12 16.875l-.014.004-3.442-.929-.22-2.463H6.64l.433 4.852 6.326 1.756.014-.004v-2.216z"/>
          <path fill="#fff" d="M11.991 9.688v2.637h2.97l-.279 3.125-2.691.727v2.216l4.947-1.372.036-.406.563-6.31.059-.657H11.991zM11.991 4.125v2.75h5.327l.044-.498.099-1.115.051-.576H11.991z"/>
        </svg>
      )
    },
    {
      name: 'CSS3',
      logo: (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" 
          alt="CSS3 Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: 'JavaScript',
      logo: (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
          alt="JavaScript Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: 'React',
      logo: (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
          alt="React Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: 'WordPress',
      logo: (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" 
          alt="WordPress Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: 'UI/UX Design',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#ff7262" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    }
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
                  <img src="/kunal-profile.jpg" alt="Kunal Bisen" className="w-full h-full object-cover" />
                </div>
              </div>
              
              {/* Clickable Experience Badge - Bottom Right */}
              <button 
                ref={badgeRef}
                onClick={scrollToContact}
                className="absolute -bottom-2 -right-2 bg-gradient-primary text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-background backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="whitespace-nowrap font-semibold">4+ Years</div>
                  <div className="text-xs whitespace-nowrap opacity-90">Experience</div>
                </div>
              </button>
              
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
              <p className="text-lg">I am a results-driven website developer with a passion for creating modern, responsive, and user-focused web experiences. Over the past 4 years, I have honed my skills in designing and developing websites that not only look great but also perform exceptionally well.</p>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="skill-icon glass p-4 rounded-lg text-center hover:glow-primary transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      {skill.logo}
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