import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header animation
    gsap.fromTo(headerRef.current, {
      opacity: 0,
      y: -30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Video container animation
    gsap.fromTo(videoRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="video" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Introduction Video
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Get to know more about my work, approach, and passion for creating exceptional web experiences.
          </p>
        </div>

        {/* Introduction Video Frame */}
        <div ref={videoRef} className="w-full max-w-5xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl border-2 border-primary/20"
              src="https://www.youtube.com/embed/pdC6dFg2Yfw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Additional Content */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Why Watch This Video?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground mb-2">My Journey</h4>
                <p className="text-sm text-muted-foreground">Learn about my 4+ years of experience in web development</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.5L15.5 5H17V3.5L15.5 2H9a2 2 0 0 0-2 2v7zm8 8H9v-9h8v9z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground mb-2">My Approach</h4>
                <p className="text-sm text-muted-foreground">Discover my methodology for creating exceptional websites</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground mb-2">My Vision</h4>
                <p className="text-sm text-muted-foreground">Understand my passion for modern, user-focused design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;