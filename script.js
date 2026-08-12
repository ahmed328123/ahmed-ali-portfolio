/* =========================================================
   Ahmed Ali — Advanced QA Portfolio
   Final Clean Interactions & Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* =======================================================
     EXTERNAL LINK SECURITY
     ======================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });


  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".project-card",
        ".timeline-item",
        ".skill-box",
        ".cert-card",
        ".language-card",
        ".contact-box",
        ".section-title",
        ".section-top"
      ].join(",")
    );


  if (!reducedMotion) {

    revealElements.forEach((element) => {

      element.classList.add("reveal");

    });


    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },

        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }

      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     HERO ENTRANCE ANIMATION
     ======================================================= */

  if (!reducedMotion) {

    const heroElements = [

      document.querySelector(".status"),

      document.querySelector(
        ".hero-title"
      ),

      document.querySelector(
        ".hero-subtitle"
      ),

      document.querySelector(
        ".hero-text"
      ),

      document.querySelector(
        ".hero-stack"
      ),

      document.querySelector(
        ".hero-actions"
      )

    ].filter(Boolean);


    heroElements.forEach(
      (element, index) => {

        element.animate(

          [
            {
              opacity: 0,
              transform:
                "translateY(22px)"
            },

            {
              opacity: 1,
              transform:
                "translateY(0)"
            }
          ],

          {
            duration: 700,

            delay:
              100 + index * 100,

            easing:
              "cubic-bezier(.2,.7,.2,1)",

            fill: "both"
          }

        );

      }
    );

  }


  /* =======================================================
     ACTIVE NAVBAR SECTION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "#projects, #experience, #skills, #certifications, #languages, #contact"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  function setActiveNav(sectionId) {

    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${sectionId}`
      );

    });

  }


  const sectionObserver =
    new IntersectionObserver(

      (entries) => {

        const visibleEntries =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );


        if (visibleEntries.length === 0) {
          return;
        }


        setActiveNav(
          visibleEntries[0].target.id
        );

      },

      {
        threshold: [
          0.1,
          0.25,
          0.4,
          0.6
        ],

        rootMargin:
          "-18% 0px -58% 0px"
      }

    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });


  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (!navbar) {
      return;
    }


    if (window.scrollY > 40) {

      navbar.style.background =
        "rgba(5, 9, 13, 0.94)";

      navbar.style.boxShadow =
        "0 10px 45px rgba(0,0,0,0.20)";

    } else {

      navbar.style.background =
        "rgba(5, 9, 13, 0.72)";

      navbar.style.boxShadow =
        "none";

    }

  }


  updateNavbar();


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* =======================================================
     HERO MOUSE PARALLAX
     ======================================================= */

  const hero =
    document.querySelector(".hero");

  const heroRight =
    document.querySelector(
      ".hero-right"
    );


  if (
    hero &&
    heroRight &&
    !reducedMotion &&
    finePointer
  ) {

    heroRight.style.transition =
      "transform 0.18s ease-out";


    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        heroRight.style.transform =
          `
          translate3d(
            ${x * 9}px,
            ${y * 7}px,
            0
          )
          `;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroRight.style.transform =
          "translate3d(0, 0, 0)";

      }
    );

  }


  /* =======================================================
     PROJECT CARD 3D HOVER
     ======================================================= */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );


  if (
    !reducedMotion &&
    finePointer
  ) {

    projectCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateY =
            (
              (x / rect.width) -
              0.5
            ) * 2.2;


          const rotateX =
            (
              (y / rect.height) -
              0.5
            ) * -2.2;


          card.style.transform =
            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-7px)
            `;


          card.style.boxShadow =
            `
            0 30px 70px
            rgba(0,0,0,.38),

            ${rotateY * -4}px
            ${rotateX * 4}px
            45px
            rgba(85,230,193,.05)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

          card.style.boxShadow = "";

        }
      );

    });

  }


  /* =======================================================
     LANGUAGE CARD STAGGER
     ======================================================= */

  const languageCards =
    document.querySelectorAll(
      ".language-card"
    );


  languageCards.forEach(
    (card, index) => {

      if (!reducedMotion) {

        card.style.transitionDelay =
          `${index * 70}ms`;

      }

    }
  );


  /* =======================================================
     SKILL CARD STAGGER
     ======================================================= */

  const skillCards =
    document.querySelectorAll(
      ".skill-box"
    );


  skillCards.forEach(
    (card, index) => {

      if (!reducedMotion) {

        card.style.transitionDelay =
          `${index * 55}ms`;

      }

    }
  );


  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      const href =
        link.getAttribute("href");


      if (
        !href ||
        href === "#"
      ) {
        return;
      }


      link.addEventListener(
        "click",
        (event) => {

          const target =
            document.querySelector(
              href
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              reducedMotion
                ? "auto"
                : "smooth",

            block: "start"

          });

        }
      );

    });


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  const backToTop =
    document.querySelector(
      '.footer a[href="#"]'
    );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();


        window.scrollTo({

          top: 0,

          behavior:
            reducedMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  }


  /* =======================================================
     LOGO BACK TO TOP
     ======================================================= */

  const logo =
    document.querySelector(
      '.logo[href="#"]'
    );


  if (logo) {

    logo.addEventListener(
      "click",
      (event) => {

        event.preventDefault();


        window.scrollTo({

          top: 0,

          behavior:
            reducedMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  }


  /* =======================================================
     BACKGROUND MOUSE PARALLAX
     ======================================================= */

  const background =
    document.querySelector(
      ".page-bg"
    );


  if (
    background &&
    !reducedMotion &&
    finePointer
  ) {

    background.style.transition =
      "transform 0.15s ease-out";


    document.addEventListener(
      "mousemove",
      (event) => {

        const x =
          event.clientX /
          window.innerWidth -
          0.5;


        const y =
          event.clientY /
          window.innerHeight -
          0.5;


        background.style.transform =
          `
          translate(
            ${x * -5}px,
            ${y * -5}px
          )
          scale(1.02)
          `;

      }
    );

  }


  /* =======================================================
     RESET PARALLAX WHEN TAB LOSES FOCUS
     ======================================================= */

  window.addEventListener(
    "blur",
    () => {

      if (heroRight) {

        heroRight.style.transform =
          "translate3d(0, 0, 0)";

      }


      if (background) {

        background.style.transform =
          "translate(0, 0) scale(1)";

      }

    }
  );


  /* =======================================================
     CONSOLE SIGNATURE
     ======================================================= */

  console.log(
    "%c Ahmed Ali — QA Portfolio ",
    `
    background:#55e6c1;
    color:#04100c;
    padding:8px 12px;
    border-radius:4px;
    font-weight:bold;
    `
  );


  console.log(
    "Manual Testing • Automation Testing • Playwright • Selenium • API Testing • CI/CD"
  );

});
