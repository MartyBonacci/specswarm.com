import { useEffect, useRef, useState } from 'react';

const COMMANDS = ['init', 'build', 'fix', 'ship'];
const BASE_TEXT = '/specswarm';
const TYPING_SPEED = 60; // ms per character
const DELETE_SPEED = 40; // ms per character (faster delete)
const PAUSE_AFTER_COMPLETE = 2000; // ms to pause after typing complete command
const PAUSE_AFTER_DELETE = 500; // ms to pause after deleting command
const PAUSE_AFTER_CYCLE = 5000; // ms to pause at start of new cycle (2.5x longer)

export default function AnimatedBrand() {
  const [displayText, setDisplayText] = useState(BASE_TEXT);
  const [isPaused, setIsPaused] = useState(false);
  const commandIndexRef = useRef(0);
  const isTypingRef = useRef(true);
  const currentTextRef = useRef('');

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(BASE_TEXT);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      if (isPaused) {
        timeoutId = setTimeout(animate, 100);
        return;
      }

      const currentCommand = COMMANDS[commandIndexRef.current];
      const targetText = `:${currentCommand}`;

      if (isTypingRef.current) {
        // Typing phase
        if (currentTextRef.current.length < targetText.length) {
          currentTextRef.current = targetText.slice(0, currentTextRef.current.length + 1);
          setDisplayText(BASE_TEXT + currentTextRef.current);
          timeoutId = setTimeout(animate, TYPING_SPEED);
        } else {
          // Finished typing, pause then start deleting
          isTypingRef.current = false;
          timeoutId = setTimeout(animate, PAUSE_AFTER_COMPLETE);
        }
      } else {
        // Deleting phase
        if (currentTextRef.current.length > 0) {
          currentTextRef.current = currentTextRef.current.slice(0, -1);
          setDisplayText(BASE_TEXT + currentTextRef.current);
          timeoutId = setTimeout(animate, DELETE_SPEED);
        } else {
          // Finished deleting, move to next command
          commandIndexRef.current = (commandIndexRef.current + 1) % COMMANDS.length;
          isTypingRef.current = true;
          // Use longer pause at start of new cycle (when index wraps to 0)
          const pauseDuration = commandIndexRef.current === 0 ? PAUSE_AFTER_CYCLE : PAUSE_AFTER_DELETE;
          timeoutId = setTimeout(animate, pauseDuration);
        }
      }
    };

    timeoutId = setTimeout(animate, PAUSE_AFTER_COMPLETE);

    return () => clearTimeout(timeoutId);
  }, [isPaused]);

  return (
    <span
      className="animated-brand"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {displayText}
      <span className="cursor" aria-hidden="true">|</span>

      <style>{`
        .animated-brand {
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Dank Mono', 'Source Code Pro', monospace;
          font-weight: 600;
          position: relative;
          display: inline-block;
          color: var(--color-primary);
        }

        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          color: var(--color-accent);
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .cursor {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
