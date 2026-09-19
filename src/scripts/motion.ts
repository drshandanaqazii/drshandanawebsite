/**
 * Motion controller — scroll reveals, parallax, and the nav condense.
 *
 * The one rule this file exists to enforce: content must never be left
 * invisible. Everything below has an escape hatch back to the resting state —
 * see revealAll(), the init sweep, and the scroll sweep that backstops the
 * observer.
 *
 * The [data-motion="on"] flag is set by an inline script in BaseLayout so the
 * hidden state applies before first paint. This module owns removing it again
 * if anything here cannot run.
 */

const root = document.documentElement;

/** Drop the flag entirely — every reveal rule is scoped to it, so the page
 *  snaps back to its plain visible state. */
function standDown() {
  root.removeAttribute('data-motion');
}

/** Reveal every tracked element without waiting for its observer. */
function revealAll() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-in');
    el.style.removeProperty('--reveal-delay');
  });
}

/* -------------------------------------------------------------------------- */

const STAGGER_MS = 90;

function initReveals() {
  // Groups reveal as a unit and stagger their children, so a row of three
  // cards arrives as one gesture rather than three separate ones.
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(':scope > [data-reveal]');
    items.forEach((item, i) => {
      item.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`);
    });
  });

  // Anything still waiting on the observer. Also the working set for the
  // scroll sweep below.
  const pending = new Set<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        pending.delete(el);
        reveal(el);
      }
    },
    // Fires a little before the element is fully on screen; the bottom margin
    // keeps anything entering from below from popping in late.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
  );

  const vh = window.innerHeight;

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    // Already on screen or scrolled past — most likely an anchor jump on load.
    // Reveal now; never hand these to the observer.
    if (el.getBoundingClientRect().top < vh) {
      reveal(el);
      return;
    }
    pending.add(el);
    observer.observe(el);
  });

  // Backstop. If the observer silently never fires — the failure mode that
  // sank the two previous attempts — this reveals anything that has reached
  // the viewport anyway. Deliberately *not* a blanket timer: a timer that
  // reveals everything would also un-animate the whole page below the fold.
  let queued = false;

  const sweep = () => {
    queued = false;
    const height = window.innerHeight;

    for (const el of pending) {
      if (el.classList.contains('is-in')) {
        pending.delete(el);
        continue;
      }
      if (el.getBoundingClientRect().top >= height) continue;
      observer.unobserve(el);
      pending.delete(el);
      reveal(el);
    }

    if (!pending.size) removeEventListener('scroll', onScroll);
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  addEventListener('scroll', onScroll, { passive: true });
}

function reveal(el: HTMLElement) {
  const group = el.closest<HTMLElement>('[data-reveal-group]');
  if (!group || group === el) {
    el.classList.add('is-in');
    return;
  }

  // One member entering brings the whole group in, so a row of cards reads as
  // a single gesture.
  const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-reveal]'));

  // `el` itself is not always in that list. Several sections wrap their eyebrow
  // and heading in a .section-head that is not its own group, which makes those
  // two grandchildren of the group — revealing only the direct children would
  // leave the heading permanently invisible while the rows beneath it arrived.
  if (!items.includes(el)) items.push(el);

  items.forEach((item) => item.classList.add('is-in'));

  // The stagger delay lives on the same transition-delay the hover lift uses.
  // Once the entrance is done it has to go, or hovering a card lags.
  window.setTimeout(() => {
    items.forEach((item) => item.style.removeProperty('--reveal-delay'));
  }, 900 + items.length * STAGGER_MS);
}

/* -------------------------------------------------------------------------- */

interface ParallaxItem {
  el: HTMLElement;
  /** Total travel in px across a full pass through the viewport. Negative
   *  values drift against the scroll, which is what reads as "nearer". */
  range: number;
  active: boolean;
}

/** Narrow viewports get a gentler pass. Layers are physically shorter on a
 *  phone, so desktop travel would either overshoot a clipping frame or just
 *  read as jitter. */
function strengthFor(width: number) {
  if (width < 600) return 0.45;
  if (width < 900) return 0.65;
  return 1;
}

function initParallax() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!nodes.length) return;

  const items: ParallaxItem[] = nodes.map((el) => {
    // A written 0 is a real answer — "over-scale this one, but hold it still" —
    // so it has to survive the parse rather than fall through to the default.
    const raw = el.dataset.parallax;
    const range = raw === undefined || raw === '' ? NaN : Number(raw);
    return { el, range: Number.isFinite(range) ? range : 40, active: false };
  });

  // Seat the over-scale up front, as a variable the stylesheet composes into
  // the transform. Writing style.transform here instead would collide with the
  // reveal and hover rules, which own that same property.
  for (const item of items) {
    const scale = Number(item.el.dataset.parallaxScale);
    if (scale && scale !== 1) {
      item.el.style.setProperty('--parallax-scale', String(scale));
    }
  }

  let strength = strengthFor(window.innerWidth);

  // Only elements currently on screen get measured on scroll.
  const gate = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const item = items.find((i) => i.el === entry.target);
        if (item) item.active = entry.isIntersecting;
      }
      schedule();
    },
    { rootMargin: '15% 0px' }
  );
  items.forEach((item) => gate.observe(item.el));

  let queued = false;

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  function apply() {
    queued = false;
    const vh = window.innerHeight;

    for (const item of items) {
      if (!item.active) continue;
      const rect = item.el.getBoundingClientRect();
      // -1 when the element sits just below the fold, +1 once just above it.
      const progress = 1 - 2 * ((rect.top + rect.height / 2) / (vh + rect.height));
      const y = progress * (item.range / 2) * strength;
      item.el.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
    }
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => {
    strength = strengthFor(window.innerWidth);
    schedule();
  }, { passive: true });

  apply();
}

/* -------------------------------------------------------------------------- */

/**
 * Footer curtain — decides whether the footer can be uncovered rather than
 * scrolled to, and publishes its height as --footer-h so .page can reserve
 * exactly that much bottom margin.
 *
 * Both halves of that are measured rather than guessed. The footer is a
 * four-column site map, so its height moves a long way between a wide window
 * and a phone, where the columns stack. Past roughly half the window it stops
 * being a curtain and becomes a screen of purple the reader has to scroll
 * through, so beyond that ratio the flag is dropped and the footer goes back
 * into normal flow — every rule that makes it fixed is scoped to the flag.
 *
 * Unlike the reveals, this is not gated on data-motion. The curtain is a
 * layout, not an animation — it has nothing to soften for reduced motion, and
 * leaving it unmeasured would strand the last section behind the footer.
 */
function initCurtain() {
  const footer = document.querySelector<HTMLElement>('.footer');
  if (!footer) return;
  const page = document.querySelector<HTMLElement>('.page');

  /** Above this share of the window, uncovering the footer is worse than
   *  scrolling to it. Three quarters rather than a half: at a desktop width
   *  the site map lands a little over half the window, and the tighter ceiling
   *  meant the curtain was almost never taken — the footer just sat at the end
   *  of the page. Below it there is still a strip of paper above the footer at
   *  full scroll, which is what keeps it reading as uncovered. */
  const MAX_SHARE = 0.75;

  /** …and never so tall that the page above it is a sliver. */
  const MIN_STRIP = 120;

  let on = false;

  const sync = () => {
    const h = footer.offsetHeight;
    root.style.setProperty('--footer-h', `${h}px`);

    on = h > 0 && h <= window.innerHeight * MAX_SHARE && h <= window.innerHeight - MIN_STRIP;

    if (on) {
      root.setAttribute('data-curtain', 'on');
    } else {
      root.removeAttribute('data-curtain');
      // Resting value. In flow the footer is simply there, fully drawn.
      root.style.setProperty('--curtain', '1');
    }

    track();
  };

  /**
   * How much of the footer the page has slid off, 0 → 1, published as
   * --curtain for the footer's own styles to lean on.
   *
   * `.page` reserves exactly the footer's height as bottom margin, so the gap
   * between the bottom of its content and the bottom of the window *is* the
   * uncovered strip. Decorative only: the stylesheet's fallback is 1, so a
   * value that never gets written renders the footer at rest rather than
   * blank — the same contract as --progress.
   */
  const track = () => {
    if (!on || !page) return;
    const h = footer.offsetHeight;
    if (h <= 0) return;
    const uncovered = window.innerHeight - page.getBoundingClientRect().bottom;
    root.style.setProperty('--curtain', Math.min(1, Math.max(0, uncovered / h)).toFixed(3));
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      track();
    });
  };

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(sync).observe(footer);
  }
  // Needed either way: ResizeObserver watches the element, and the decision
  // above also depends on the window it is being measured against.
  addEventListener('resize', sync, { passive: true });
  addEventListener('scroll', schedule, { passive: true });
  sync();
}

/* -------------------------------------------------------------------------- */

/**
 * Scroll progress — a track that draws itself in as the reader descends.
 *
 * Writes --progress (0→1) on every [data-progress] element. Purely decorative:
 * the stylesheet's resting value is 1, so a track that is never written to
 * renders complete rather than blank. Nothing readable depends on it.
 */
function initProgress() {
  const tracks = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
  if (!tracks.length) return;

  // Where on screen a point on the track counts as reached. Just below the
  // middle, so the line arrives at a marker about when its copy is being read.
  const ANCHOR = 0.55;

  let queued = false;

  function apply() {
    queued = false;
    const line = window.innerHeight * ANCHOR;

    for (const track of tracks) {
      const rect = track.getBoundingClientRect();
      if (!rect.height) continue;
      const p = (line - rect.top) / rect.height;
      track.style.setProperty('--progress', Math.min(1, Math.max(0, p)).toFixed(3));
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });

  apply();
}

/* -------------------------------------------------------------------------- */

function initNav() {
  const nav = document.querySelector<HTMLElement>('.navwrap');
  if (!nav) return;

  const sync = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
  addEventListener('scroll', sync, { passive: true });
  sync();
}

/* -------------------------------------------------------------------------- */

// Runs regardless of the motion flag — see the note on initCurtain.
try {
  initCurtain();
} catch {
  /* .page keeps its fallback margin; the footer is still reachable. */
}

if (root.getAttribute('data-motion') !== 'on') {
  // The inline script decided against motion (reduced-motion preference, or
  // the flag was never set). The page is already in its resting state.
} else if (typeof IntersectionObserver !== 'function') {
  standDown();
} else {
  try {
    initReveals();
    initParallax();
    initProgress();
    initNav();
  } catch {
    // Something in here threw. Give up on motion entirely rather than leave
    // the page half-initialised with content hidden.
    standDown();
    revealAll();
  }
}
