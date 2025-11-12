import { useEffect } from 'react';

export default function MobileMenu() {
  useEffect(() => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    const handleToggle = () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('mobile-menu-open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    const handleLinkClick = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu.classList.contains('mobile-menu-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
      }
    };

    toggle.addEventListener('click', handleToggle);

    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    document.addEventListener('keydown', handleEscape);

    return () => {
      toggle.removeEventListener('click', handleToggle);
      mobileLinks.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return null;
}
