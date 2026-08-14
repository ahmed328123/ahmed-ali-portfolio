/* =========================================================
   Ahmed Ali — Premium Light QA Portfolio
   Interactions & Animations
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
     HERO ENTRANCE
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
              100 + index * 90,

            easing:
              "cubic-bezier(.2,.7,.2,1)",

            fill: "both"
          }

        );

      }
    );

  }



  /* =======================================================
     NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "#projects, #experience, #skills, #certifications, #languages, #contact"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  function clearActiveNav() {

    navLinks.forEach((link) => {

      link.classList.remove("active");

    });

  }


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


        if (
          visibleEntries.length === 0
        ) {
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
     LIGHT NAVBAR SCROLL EFFECT
     ======================================================= */

  const navbar =
    document.querySelector(
      ".navbar"
    );

  const projectsSection =
    document.querySelector(
      "#projects"
    );


  function updateNavbar() {

    if (!navbar) {
      return;
    }


    if (window.scrollY > 35) {

      navbar.style.background =
        "rgba(248, 250, 251, 0.96)";

      navbar.style.boxShadow =
        "0 10px 35px rgba(35, 52, 61, 0.07)";

      navbar.style.borderBottomColor =
        "rgba(16, 24, 32, 0.10)";

    } else {

      navbar.style.background =
        "rgba(248, 250, 251, 0.88)";

      navbar.style.boxShadow =
        "none";

      navbar.style.borderBottomColor =
        "rgba(16, 24, 32, 0.08)";

    }


    /*
     * Do not highlight WORK
     * while the user is still in the hero.
     */

    if (projectsSection) {

      const projectsTop =
        projectsSection.offsetTop;

      if (
        window.scrollY <
        projectsTop - 250
      ) {

        clearActiveNav();

      }

    }

  }


  updateNavbar();


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );



  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  const hero =
    document.querySelector(
      ".hero"
    );

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
      "transform 0.2s ease-out";


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
            ${x * 7}px,
            ${y * 6}px,
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
     PROJECT CARD PREMIUM HOVER — LIGHT MODE
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
            ) * 1.8;


          const rotateX =
            (
              (y / rect.height) -
              0.5
            ) * -1.8;


          card.style.transform =
            `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
            `;


          card.style.boxShadow =
            `
            0 26px 60px
            rgba(35, 52, 61, 0.13),

            ${rotateY * -2}px
            ${rotateX * 2}px
            35px
            rgba(20, 184, 154, 0.05)
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
     FLOATING CARDS SUBTLE DEPTH
     ======================================================= */

  const floatingCards =
    document.querySelectorAll(
      ".floating-card"
    );


  if (
    !reducedMotion &&
    finePointer
  ) {

    floatingCards.forEach(
      (card) => {

        card.addEventListener(
          "mouseenter",
          () => {

            card.style.boxShadow =
              `
              0 18px 45px
              rgba(35, 52, 61, 0.12)
              `;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.boxShadow = "";

          }
        );

      }
    );

  }



  /* =======================================================
     LANGUAGE STAGGER
     ======================================================= */

  const languageCards =
    document.querySelectorAll(
      ".language-card"
    );


  languageCards.forEach(
    (card, index) => {

      if (!reducedMotion) {

        card.style.transitionDelay =
          `${index * 65}ms`;

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
          `${index * 50}ms`;

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
     LOGO → TOP
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
     BACKGROUND PARALLAX
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
      "transform 0.2s ease-out";


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
            ${x * -3}px,
            ${y * -3}px
          )
          scale(1.01)
          `;

      }
    );

  }



  /* =======================================================
     RESET PARALLAX
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


      projectCards.forEach((card) => {

        card.style.transform = "";

        card.style.boxShadow = "";

      });

    }
  );



  /* =======================================================
     CONSOLE SIGNATURE
     ======================================================= */

  console.log(
    "%c Ahmed Ali — QA Portfolio ",
    `
    background:#14b89a;
    color:#ffffff;
    padding:8px 12px;
    border-radius:4px;
    font-weight:bold;
    `
  );


  console.log(
    "Manual Testing • Automation Testing • Playwright • Selenium • API Testing • CI/CD"
  );

});
