import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for trigger button click
    const trigger = document.getElementById('mobile-menu-trigger');
    const handler = () => setIsOpen(true);
    trigger?.addEventListener('click', handler);

    // Prevent body scroll when menu open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Escape key to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      trigger?.removeEventListener('click', handler);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      onClick={() => setIsOpen(false)}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/80" />

      {/* Menu Panel */}
      <div
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 ml-auto block"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="mt-8 space-y-4">
            <a
              href="/"
              className={`block text-lg ${currentPath === '/' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="/features"
              className={`block text-lg ${currentPath === '/features' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="/pricing"
              className={`block text-lg ${currentPath === '/pricing' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="https://github.com/MartyBonacci/specswarm"
              target="_blank"
              rel="noopener"
              className="block text-lg text-gray-900"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
