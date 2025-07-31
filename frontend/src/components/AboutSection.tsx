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
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="#1572b6" d="M3.345 21.601L1.419 0h21.162l-1.926 21.601L11.985 24l-8.64-2.399z"/>
          <path fill="#33a9dc" d="M12 22.164l6.995-1.939L20.52 2.281H12v19.883z"/>
          <path fill="#fff" d="M12 4.531l4.723.016-.094 1.078-.108 1.235H12v-2.329zM12 9.688h4.442l-.094 1.078-.15 1.671H12V9.688zM12 15.719l-.014.004-2.75-.744-.176-1.969H7.344l.346 3.875L12 17.133l.014-.004v-1.41z"/>
          <path fill="#ebebeb" d="M12 4.531v2.329H7.953l-.144-1.641-.033-.374-.081-.906L12 4.531zM12 9.688v2.749H9.641l-.144-1.64-.034-.375-.081-.906L12 9.688zM12 15.719v1.41l-2.75-.744-.176-1.969H7.344l.346 3.875L12 17.133v-1.414z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <rect fill="#f7df1e" width="24" height="24" rx="2"/>
          <path fill="#000" d="M7.334 14.963c.42 0 .684-.203.684-.67V9.976h1.344v4.367c0 1.154-.676 1.678-1.664 1.678-.892 0-1.407-.42-1.668-1.092l1.176-.721c.203.368.392.595.728.595zM12.219 14.866c.476 0 .784-.231.784-.595 0-.406-.308-.546-.826-.784l-.28-.119c-.805-.343-1.344-.77-1.344-1.68 0-.833.644-1.47 1.645-1.47.714 0 1.225.245 1.596.91l-1.092.714c-.245-.441-.511-.616-.861-.616-.392 0-.644.245-.644.616 0 .434.252.609.833.875l.28.119c.952.406 1.491.819 1.491 1.75 0 1.008-.798 1.554-1.862 1.554-1.05 0-1.722-.497-2.051-1.148l1.162-.728c.301.511.714.847 1.274.847z"/>
        </svg>
      )
    },
    {
      name: 'React',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <circle fill="#61dafb" cx="12" cy="12" r="2"/>
          <path fill="none" stroke="#61dafb" strokeWidth="1" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
          <path fill="none" stroke="#61dafb" strokeWidth="1" d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
          <path fill="none" stroke="#61dafb" strokeWidth="1" d="M12 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
        </svg>
      )
    },
    {
      name: 'WordPress',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <circle fill="#21759b" cx="12" cy="12" r="12"/>
          <path fill="#fff" d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 1.58.37 3.06 1.01 4.38l5.39-14.76c.9-.23 1.51-.4 1.51-.4s-.68-.08-1.44-.08c-.76 0-1.44.08-1.44.08s.68-1.21 1.58-1.21c.9 0 1.58 1.21 1.58 1.21s-.68.08-1.44.08zm7.13 2.25c.86 1.29 1.36 2.84 1.36 4.51 0 1.67-.5 3.22-1.36 4.51l-3.5-10.13c.58-.23 1.19-.4 1.19-.4s-.68-.08-1.44-.08c-.76 0-1.44.08-1.44.08s.68-1.21 1.58-1.21c.9 0 1.58 1.21 1.58 1.21s-.68.08-1.44.08z"/>
          <path fill="#fff" d="M12 21.96c5.5 0 9.96-4.46 9.96-9.96 0-3.31-1.61-6.24-4.09-8.06l2.44 7.06c.45 1.13.6 2.04.6 2.85 0 2.92-1.88 5.39-4.49 6.26z"/>
        </svg>
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