/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // MutationObserver — LAYER 3: kills badge the instant it's injected
    const badgeKiller = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== 1) return;
          const el = node as HTMLElement;

          let kill = false;

          if (el.tagName === 'A' && (el as HTMLAnchorElement).href && (
            (el as HTMLAnchorElement).href.includes('unicorn') ||
            (el as HTMLAnchorElement).href.includes('studio')
          )) kill = true;

          if (typeof el.className === 'string' && (
            el.className.includes('badge') ||
            el.className.includes('unicorn') ||
            el.className.includes('watermark') ||
            el.className.includes('branding')
          )) kill = true;

          if (kill) { el.remove(); return; }

          /* Also sweep inside any injected wrapper */
          if (el.querySelectorAll) {
            el.querySelectorAll(
              'a[href*="unicorn"], [class*="badge"], [class*="watermark"]'
            ).forEach((child) => child.remove());
          }
        });
      });
    });

    /* Watch entire document — catches badge wherever it appears */
    badgeKiller.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    /* Load SDK then init with production:true */
    const sdkScript = document.createElement('script');
    sdkScript.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.9/dist/unicornStudio.umd.js';

    sdkScript.onload = () => {
      // @ts-ignore
      if (window.UnicornStudio) {
        // @ts-ignore
        window.UnicornStudio.addScene({
          elementId:  'unicorn-container',
          projectId:  'F73kDYmT09G6uiXPlJIH',
          production: true,
          scale:      1,
          dpi:        1.5,
          fps:        60,
          lazyLoad:   false
        });

        /* Final timed sweep — belt and braces */
        [500, 1500, 3000].forEach((delay) => {
          setTimeout(() => {
            document.querySelectorAll(
              'a[href*="unicorn"], a[href*="studio"], ' +
              '[class*="badge"], [id*="badge"], [class*="watermark"]'
            ).forEach((el) => el.remove());
          }, delay);
        });
      }
    };

    document.head.appendChild(sdkScript);

    return () => {
      badgeKiller.disconnect();
    };
  }, []);

  useEffect(() => {
    const animatedEls = document.querySelectorAll(
      '.about-photo-wrap, .about-label, .about-q-line1, .about-q-line2, ' +
      '.about-answer, .about-para, .about-closing, .contact-anim'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedEls.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-[#FAF7F0] font-sans overflow-x-hidden">
      <div className="relative w-full h-screen overflow-hidden">
        {/* NAVBAR */}
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-7">
          <a href="#" className="font-sans text-[15px] font-medium tracking-[0.12em] uppercase text-[#FAF7F0] no-underline">
            Priyanka
          </a>
          <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
            <li>
              <a href="#work" className="font-mono font-bold text-[11px] tracking-[0.14em] uppercase text-[#FAF7F0] no-underline opacity-85 hover:opacity-100 transition-opacity duration-200">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="font-mono font-bold text-[11px] tracking-[0.14em] uppercase text-[#FAF7F0] no-underline opacity-85 hover:opacity-100 transition-opacity duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="font-mono font-bold text-[11px] tracking-[0.14em] uppercase text-[#1C1611] bg-[#D4A843] px-5 py-2.5 rounded-full no-underline opacity-100 hover:bg-[#FAF7F0] transition-colors duration-200">
                Let's Talk
              </a>
            </li>
          </ul>
        </nav>

        {/* UNICORNSTUDIO CONTAINER */}
        <div id="unicorn-container" className="absolute top-0 left-0 w-full h-full z-0"></div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about">
        {/* LEFT — PHOTO */}
        <div className="about-left">
          <div className="about-photo-wrap">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczPuCHk9Cv5vRgiVVoJwhNxZvkBB_COHDSz9O1pDBb1Hvpc1DAMVKFGBLw057QO5ci4xRFVE5HgYkx2epijT8HC9ZCM3URoBxSiJ86PxhcRdEgpu_0tNMkcu0FOgthFKeRbLDsv0nrbZpmg7GJtXYUqu=w1114-h1602-s-no-gm?authuser=0" alt="Priyanka — Designer & Researcher" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <div className="about-right">
          <span className="about-label">About</span>

          <span className="about-q-line1">What do painting and</span>
          <span className="about-q-line2">product design have in common?</span>

          <p className="about-answer">More than you'd think.</p>

          <div className="about-body">
            <p className="about-para">
              Both begin with not knowing. Both require you to make something out of
              nothing and then argue for why it belongs in the world. Both punish
              shortcuts and reward patience. Both are, at their core, about
              communicating something that was previously inexpressible.
            </p>
            <p className="about-para">
              I'm Priyanka, and I have a BFA in Applied Art from the College of Art, Delhi and
              an MDes in Experience Design from NIFT Bengaluru. One degree taught me
              to feel problems before I could name them. The other taught me to name
              them before I try to solve them.
            </p>
          </div>

          <p className="about-closing">
            I work at that intersection.<br />
            It's the only place I've ever been fully comfortable.
          </p>
        </div>
      </section>

      {/* SECTION 03 — SELECTED WORK */}
      <section id="work">
        <div className="work-header">
          <h2 className="work-heading">Selected Work</h2>
          <span className="work-year">2024 — 2026</span>
        </div>

        <div className="work-grid">
          {/* CARD 01 */}
          <div className="work-card" onClick={() => window.location.href='work.html#experience'}>
            <div className="card-thumb">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczP8OuhJldh2teLKBck1A-QUYi9vN0SVzEnxv0AKlzWelvTLWUCl76V34BgnCl1vaXWYDj03pSZ5N_6-l-8unVhwMGqV7tOzVRbudI0Fmc8-xW2ZVbs2dkJElMhIo8sI7hoHL-hi7TqukcL48UgkjIhl=w1034-h765-s-no-gm?authuser=0" alt="Experience Design projects" referrerPolicy="no-referrer" />
            </div>
            <div className="card-top">
              <span className="card-num">01</span>
              <span className="card-cluster">Experience Design</span>
              <div className="card-rule"></div>
              <h3 className="card-heading">Good design asks<br />before it answers.</h3>
              <p className="card-body">
                Before the wireframe, before the prototype — there is a question.
                Who is this really for? What are they actually trying to do?
                The best products are built from the answer to that,
                not from assumptions.
              </p>
            </div>
            <div className="card-bottom">
              <p className="card-tags">
                ITC Sunbean &nbsp;·&nbsp; FlexPrice &nbsp;·&nbsp;
                Minduful &nbsp;·&nbsp; <em>+ 4 more</em>
              </p>
              <span className="card-cta">Explore the work <span>→</span></span>
            </div>
          </div>

          {/* CARD 02 */}
          <div className="work-card" onClick={() => window.location.href='work.html#research'}>
            <div className="card-thumb">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczOa7sRQR0n75JTELPoK3ej5ZF5RPWGukclw9MyBXOBcxi85G_6g8mrBmn4EVDH9ch1IVGpnGLS9l6T1TJt0jgYZW2E-z4j1d7LFSosqOvtEo5zWZFVVMyqlTH_sK926Ee69vJqLTjROLXfQ_7K6MTsX=w1705-h1306-s-no-gm?authuser=0" alt="Research & Foresight projects" referrerPolicy="no-referrer" />
            </div>
            <div className="card-top">
              <span className="card-num">02</span>
              <span className="card-cluster">Research &amp; Foresight</span>
              <div className="card-rule"></div>
              <h3 className="card-heading">Observation is<br />the first design act.</h3>
              <p className="card-body">
                Everything worth building was first worth understanding.
                Research is not the step before the work — it is the work.
                The rest is just making it visible.
              </p>
            </div>
            <div className="card-bottom">
              <p className="card-tags">
                GenZ Macro Trends &nbsp;·&nbsp; Blue Tent Settlements &nbsp;·&nbsp;
                Toda Embroidery &nbsp;·&nbsp; <em>+ 3 more</em>
              </p>
              <span className="card-cta">Explore the work <span>→</span></span>
            </div>
          </div>

          {/* CARD 03 */}
          <div className="work-card" onClick={() => window.location.href='work.html#brand'}>
            <div className="card-thumb">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczMzXfZi1ACsO5xNCxQF_1fP1k5TOcUDhVcUdMXm6MJATpeUgm7fWvuhbGepAqwT8ofw65upo7S9YS65Unrjz5I0Mf47hwWxu7amLlJ413xIMxzNSIKSHw2B-EVOyS9tpn9KRnz6smmpHImu422UQURY=w842-h596-s-no-gm?authuser=0" alt="Brand & Visual Culture projects" referrerPolicy="no-referrer" />
            </div>
            <div className="card-top">
              <span className="card-num">03</span>
              <span className="card-cluster">Brand &amp; Visual Culture</span>
              <div className="card-rule"></div>
              <h3 className="card-heading">Every visual choice<br />is an argument.</h3>
              <p className="card-body">
                Colour, form, type, space — none of it is neutral.
                A brand is a belief system made visible. The question
                is never what looks good. It is always what does this mean?
              </p>
            </div>
            <div className="card-bottom">
              <p className="card-tags">
                VisioNxt Brand Bible &nbsp;·&nbsp; Burberry Semiotics &nbsp;·&nbsp;
                Visual Narrative &nbsp;·&nbsp; <em>+ 4 more</em>
              </p>
              <span className="card-cta">Explore the work <span>→</span></span>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="work-bottom">
          <p className="work-bottom-label">Looking for a specific project?</p>
          <a href="work.html" className="work-bottom-btn">View All Work →</a>
        </div>
      </section>

      {/* SECTION 04 — CONTACT */}
      <section id="contact">
        <div className="contact-content">
          <span className="contact-label contact-anim contact-delay-1">Contact</span>

          <div className="contact-headline contact-anim contact-delay-2">
            <span className="contact-headline-line">Let's make questions</span>
            <span className="contact-headline-line">into connections<span className="contact-headline-dot">.</span></span>
          </div>

          <div className="contact-badge contact-anim contact-delay-3">
            <div className="contact-dot"></div>
            <span className="contact-badge-text">Open to Work · Open to Talk</span>
          </div>

          <div className="contact-reach contact-anim contact-delay-4">
            <span className="contact-reach-label">Contact me at</span>
            <a href="mailto:priyankachoudhary.design@gmail.com" className="contact-reach-email">
              priyankachoudhary.design@gmail.com
            </a>
          </div>

          <a href="https://www.behance.net/gallery/224751079/Priyanka-ResumeCV" target="_blank" rel="noreferrer" className="contact-resume-btn contact-anim contact-delay-5">
            View Resume ↓
          </a>

          <div className="contact-socials contact-anim contact-delay-6">
            <a href="https://www.linkedin.com/in/priyankaart" target="_blank" rel="noreferrer" className="contact-social-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24.774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <div className="contact-social-dot"></div>
            <a href="https://www.behance.net/priyankaart" target="_blank" rel="noreferrer" className="contact-social-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H.981L.976 4.92h6.53c3.339 0 5.344 1.068 5.344 3.75 0 1.496-.564 2.54-1.986 3.227C12.6 12.664 13.5 13.7 13.5 15.83c0 3.291-2.678 4.158-5.034 4.158zM3.453 9.449v2.831h2.93c1.198 0 1.866-.551 1.866-1.454 0-.934-.668-1.377-1.866-1.377H3.453zm0 5.033v3.084h3.066c1.265 0 1.968-.557 1.968-1.562 0-.993-.703-1.522-1.968-1.522H3.453z"/>
              </svg>
              Behance
            </a>
            <div className="contact-social-dot"></div>
            <a href="mailto:priyankachoudhary.design@gmail.com" className="contact-social-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>
          </div>
        </div>

        <div className="contact-footer">
          <span className="contact-copyright">© 2026 Priyanka — All rights reserved</span>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="contact-back-top">↑ Back to top</button>
        </div>
      </section>
    </main>
  );
}
