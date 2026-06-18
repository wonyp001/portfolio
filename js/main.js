gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initHeroAnimation();
  initScrollAnimations();
  initImageReveals();
});

function initHeader() {
  const header = document.getElementById('header');

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      header.classList.toggle('header--scrolled', self.scroll() > 50);
    },
  });
}

function initMobileNav() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const links = mobileNav.querySelectorAll('.mobile-nav__link');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.classList.toggle('is-active', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      gsap.fromTo(
        links,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn.classList.remove('is-active');
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set('.reveal-text', { visibility: 'visible' });

  tl.from('.hero__label', {
    y: 30,
    opacity: 0,
    duration: 0.8,
  });

  tl.from(
    '.hero__line',
    {
      y: '110%',
      duration: 1,
      stagger: 0.12,
    },
    '-=0.4'
  );

  tl.from(
    '.hero__sub',
    {
      y: 24,
      opacity: 0,
      duration: 0.8,
    },
    '-=0.5'
  );

  tl.from(
    '.hero__actions',
    {
      y: 20,
      opacity: 0,
      duration: 0.7,
    },
    '-=0.4'
  );

  tl.from(
    '.hero__scroll-hint',
    {
      opacity: 0,
      duration: 0.6,
    },
    '-=0.2'
  );
}

function initScrollAnimations() {
  gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });
}

function initImageReveals() {
  const imageSelectors = [
    '.work__image-inner',
    '.visual__image-inner',
  ];

  imageSelectors.forEach((selector) => {
    gsap.utils.toArray(selector).forEach((el) => {
      const parent = el.parentElement;

      gsap.fromTo(
        el,
        { scale: 1.15, opacity: 0 },
        {
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    });
  });
}
