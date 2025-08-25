import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Client 1",
    role: "Founder",
    company: "",
    quote: "They delivered exactly what we needed—on time and on brand.",
    video_url: "/media/testimonials/client-1.mp4",
    poster_url: "/media/testimonials/client-1.jpg",
    captions_vtt: "/media/testimonials/client-1.vtt",
    duration_sec: 42,
  },
  {
    name: "Client 2",
    role: "Marketing Head",
    company: "",
    quote: "The website performance and design boosted our conversions.",
    video_url: "/media/testimonials/client-2.mp4",
    poster_url: "/media/testimonials/client-2.jpg",
    captions_vtt: "/media/testimonials/client-2.vtt",
    duration_sec: 55,
  },
  {
    name: "Client 3",
    role: "CTO",
    company: "",
    quote: "Clean code, clear communication, and great results.",
    video_url: "/media/testimonials/client-3.mp4",
    poster_url: "/media/testimonials/client-3.jpg",
    captions_vtt: "/media/testimonials/client-3.vtt",
    duration_sec: 38,
  },
  {
    name: "Client 4",
    role: "Product Lead",
    company: "",
    quote: "A professional partner who truly understands UX.",
    video_url: "/media/testimonials/client-4.mp4",
    poster_url: "/media/testimonials/client-4.jpg",
    captions_vtt: "/media/testimonials/client-4.vtt",
    duration_sec: 47,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in animation
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Testimonial cards stagger animation
    gsap.fromTo(
      ".testimonial-card",
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover animation for cards
    const testimonialCards = section.querySelectorAll(".testimonial-card");
    testimonialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -5, scale: 1.03, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Video playback logic
    const videos = section.querySelectorAll<HTMLVideoElement>(".testimonial-video");
    videos.forEach((video) => {
      video.addEventListener("play", () => {
        videos.forEach((otherVideo) => {
          if (otherVideo !== video) {
            otherVideo.pause();
          }
        });
      });
    });
  }, []);

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
      "video": {
        "@type": "VideoObject",
        "name": `Testimonial from ${testimonial.name}`,
        "description": testimonial.quote,
        "thumbnailUrl": testimonial.poster_url,
        "contentUrl": testimonial.video_url,
        "uploadDate": new Date().toISOString(),
        "duration": `PT${testimonial.duration_sec}S`
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
              <div className="relative aspect-video">
                <video
                  className="testimonial-video w-full h-full object-cover"
                  src={testimonial.video_url}
                  poster={testimonial.poster_url}
                  controls
                  playsInline
                  preload="metadata"
                  muted={false}
                  loop={false}
                >
                  <track
                    src={testimonial.captions_vtt}
                    kind="captions"
                    srcLang="en"
                    label="English"
                  />
                </video>
              </div>
              <div className="testimonial-meta p-6 flex-grow">
                <h3 className="font-bold text-lg text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}{testimonial.company && `, ${testimonial.company}`}</p>
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
