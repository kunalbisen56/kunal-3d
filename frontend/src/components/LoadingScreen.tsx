import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([progressRef.current, textRef.current], { opacity: 0, y: 30 });

    // Percentage counter animation
    const percentageAnimation = gsap.to({}, {
      duration: 2.5,
      onUpdate: function() {
        const progress = this.progress();
        setPercentage(Math.round(progress * 100));
      }
    });

    // Animation sequence
    tl.to([textRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(progressRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .add(percentageAnimation, "-=0.2")
    .to(progressRef.current?.querySelector('.progress-fill'), {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    }, "-=2.5")
    .to([textRef.current, progressRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in"
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    });
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <p className="text-primary text-lg tracking-widest mb-3 font-light ai-powered-text">
            AI POWERED
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-glow mb-2">
            Kunal
          </h1>
          <p className="text-accent text-xl tracking-wider mb-4 font-medium">
            Website Developer
          </p>
          <p className="text-muted-foreground text-lg tracking-wider">
            Loading Experience...
          </p>
        </div>
        
        <div ref={progressRef} className="w-80 max-w-sm mx-auto">
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div className="progress-fill h-full w-0 progress-bar rounded-full"></div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground tracking-widest">
            {percentage}% - INITIALIZING PORTFOLIO
          </div>
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-glow rounded-full blur-sm float"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-secondary-glow rounded-full blur-sm float-delayed"></div>
        <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-accent-glow rounded-full blur-md float"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;