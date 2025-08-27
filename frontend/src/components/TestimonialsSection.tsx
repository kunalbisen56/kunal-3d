import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Oliver Smith",
    role: "Founder (From Canada)",
    quote: "They delivered exactly what we needed—on time and on brand.",
    imageUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20images/Oliver%20Smith%20image.jpg",
    audioUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20audios/Oliver%20Smith%20Audio.mp3",
  },
  {
    name: "Riya Tiwari",
    role: "Marketing Head (From India)",
    quote: "The website performance and design boosted our conversions.",
    imageUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20images/Riya%20Yiwari%20image.jpg",
    audioUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20audios/Riya%20Tiwari%20Audio.mp3",
  },
  {
    name: "Noah Davis",
    role: "CTO (From England)",
    quote: "Clean code, clear communication, and great results.",
    imageUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20images/Noah%20Devis%20image.jpg",
    audioUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20audios/Noah%20Devis%20Audio.mP3",
  },
  {
    name: "Isabella Garcia",
    role: "Product Lead (From Canada)",
    quote: "A professional partner who truly understands UX.",
    imageUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20images/Isabela%20Garcia%20image.jpg",
    audioUrl: "https://bynqwtwyulrxgwjmkuqb.supabase.co/storage/v1/object/public/testimonials%20audios/Isabella%20Garcia%20Audio.mp3",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // GSAP Animations
    gsap.fromTo(section, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } });
    gsap.fromTo(".testimonial-card", { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%", toggleActions: "play none none reverse" } });

    const testimonialCards = section.querySelectorAll(".testimonial-card");

    testimonialCards.forEach(card => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      card.addEventListener("mouseenter", () => gsap.to(card, { y: -5, scale: 1.03, duration: 0.3, ease: "power2.out" }));
      card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" }));

      const button = card.querySelector<HTMLButtonElement>(".play-pause-btn");
      const audio = card.querySelector<HTMLAudioElement>("audio");
      const playIcon = card.querySelector<SVGElement>(".play-icon");
      const pauseIcon = card.querySelector<SVGElement>(".pause-icon");

      if (!button || !audio || !playIcon || !pauseIcon) return;

      const toggleIcons = (showPlay) => {
        playIcon.classList.toggle("hidden", !showPlay);
        pauseIcon.classList.toggle("hidden", showPlay);
      };

      const handleClick = () => {
        if (playingAudio === audio) {
          audio.pause();
          setPlayingAudio(null);
        } else {
          if (playingAudio) {
            playingAudio.pause();
          }
          audio.play().catch(err => console.error("Audio play failed:", err));
          setPlayingAudio(audio);
        }
      };

      button.addEventListener("click", handleClick);
      audio.addEventListener("play", () => toggleIcons(false));
      audio.addEventListener("pause", () => toggleIcons(true));
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        setPlayingAudio(null);
        toggleIcons(true);
      });

      return () => {
        button.removeEventListener("click", handleClick);
      };
    });

    return () => {
      if (playingAudio) {
        playingAudio.pause();
      }
      testimonialCards.forEach(card => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      });
    };
  }, [playingAudio]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Client Testimonials",
    "description": "Video testimonials from our clients.",
    "itemListElement": testimonials.map((testimonial, index) => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "Organization",
        "name": "Your Company Name" // Replace with actual company name
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.quote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "position": index + 1
    }))
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Real stories from real clients
          </p>
        </div>

        <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="testimonial-card bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="relative aspect-video group">
                <img
                  src={testimonial.imageUrl}
                  alt={`Testimonial from ${testimonial.name}`}
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <button
                    className="play-pause-btn text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Play/Pause audio"
                  >
                    <svg className="play-icon w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                    <svg className="pause-icon w-12 h-12 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <audio src={testimonial.audioUrl} preload="metadata"></audio>
              </div>
              <div className="testimonial-meta p-6 flex-grow">
                <h3 className="font-bold text-lg text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                {testimonial.quote && (
                  <blockquote className="testimonial-quote mt-4 text-sm italic border-l-4 border-primary pl-4">
                    {testimonial.quote}
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
};

export default TestimonialsSection;
