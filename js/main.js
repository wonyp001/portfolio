gsap.registerPlugin(ScrollTrigger);

const motion = {
  ease: 'power2.out',
  duration: 0.65,
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('.reveal-text', { visibility: 'visible' });
    gsap.set('.fade-up', { opacity: 1, y: 0 });
    initHeader();
    initMobileNav();
    return;
  }

  initHeader();
  initMobileNav();
  initHeroAnimation();
  initScrollFadeUp();
  initWorkReveal();
  initVisualReveal();
  initStaggerGrids();
  initProcessReveal();
  initHoverZoom();
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
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: motion.ease,
          delay: 0.08,
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
  const tl = gsap.timeline({ defaults: { ease: motion.ease } });

  tl.set('.reveal-text', { visibility: 'visible' });

  tl.from('.hero__label', {
    y: 10,
    opacity: 0,
    duration: 0.6,
  });

  tl.from(
    '.hero__line',
    {
      yPercent: 100,
      duration: 0.7,
      stagger: 0.06,
    },
    '-=0.35'
  );

  tl.from(
    '.hero__sub',
    {
      y: 10,
      opacity: 0,
      duration: 0.6,
    },
    '-=0.4'
  );

  tl.from(
    '.hero__actions',
    {
      y: 8,
      opacity: 0,
      duration: 0.55,
    },
    '-=0.35'
  );

  tl.from(
    '.hero__scroll-hint',
    {
      opacity: 0,
      duration: 0.5,
    },
    '-=0.2'
  );
}

function initScrollFadeUp() {
  gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: motion.ease,
    });
  });
}

function initWorkReveal() {
  gsap.utils.toArray('.work__item').forEach((item) => {
    const image = item.querySelector('.work__image-inner');
    const info = item.querySelector('.work__info');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(item, {
      y: 16,
      opacity: 0,
      duration: 0.7,
      ease: motion.ease,
    }).from(
      image,
      {
        scale: 1.03,
        duration: 0.85,
        ease: motion.ease,
      },
      0.05
    ).from(
      info,
      {
        y: 10,
        opacity: 0,
        duration: 0.55,
        ease: motion.ease,
      },
      0.15
    );
  });
}

function initVisualReveal() {
  gsap.utils.toArray('.visual__card').forEach((card) => {
    const image = card.querySelector('.visual__image-inner');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(card, {
      y: 14,
      opacity: 0,
      duration: 0.65,
      ease: motion.ease,
    }).from(
      image,
      {
        scale: 1.02,
        duration: 0.75,
        ease: motion.ease,
      },
      0.05
    );
  });
}

function initStaggerGrids() {
  ScrollTrigger.batch('.services__card', {
    start: 'top 93%',
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 14,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: motion.ease,
      });
    },
    once: true,
  });

}

function initProcessReveal() {
  ScrollTrigger.batch('.process__step', {
    start: 'top 93%',
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 12,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: motion.ease,
      });
    },
    once: true,
  });

  ScrollTrigger.batch('.why__item', {
    start: 'top 93%',
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 12,
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: motion.ease,
      });
    },
    once: true,
  });
}

function initHoverZoom() {
  const targets = [
    ...document.querySelectorAll('.work__link'),
    ...document.querySelectorAll('.visual__card'),
  ];

  targets.forEach((el) => {
    const image = el.querySelector('[class*="__image-inner"]');
    if (!image) return;

    el.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.03,
        duration: 0.5,
        ease: motion.ease,
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.55,
        ease: motion.ease,
      });
    });
  });
}
