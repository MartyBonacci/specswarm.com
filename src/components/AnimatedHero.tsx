import { useEffect, useRef, useState } from 'react';

interface AnimatedHeroProps {
  text: string;
  className?: string;
}

export default function AnimatedHero({ text, className = '' }: AnimatedHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Split text into words
  const words = text.split(' ');

  return (
    <div ref={heroRef} className={`animated-hero ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`animated-word ${isVisible ? 'animated-word-visible' : ''}`}
          style={{
            animationDelay: `${index * 75}ms`,
          }}
        >
          {word}
        </span>
      ))}

      <style>{`
        .animated-hero {
          display: block;
          line-height: 1.2;
        }

        .animated-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          margin-right: 0.3em;
        }

        .animated-word-visible {
          animation: wordFadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes wordFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .animated-word {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
