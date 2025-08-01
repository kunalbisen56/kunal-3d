import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Video = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current, {
      opacity: 0,
      y: -30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3
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
      delay: 0.6
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
                Introduction Video
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Get to know more about my work, approach, and passion for creating exceptional web experiences.
            </p>
          </div>

          {/* Introduction Video Frame */}
          <div ref={videoRef} className="w-full max-w-5xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <div className="absolute inset-0 glass rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 cursor-pointer group shadow-lg hover:shadow-primary/25">
                      <svg 
                        className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Watch My Introduction</h3>
                    <p className="text-muted-foreground text-base max-w-md mx-auto">
                      Discover my journey, expertise, and passion for web development. Learn about my approach to creating modern, user-focused digital experiences.
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>Professional Quality</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <span>5 Minutes</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default Video;