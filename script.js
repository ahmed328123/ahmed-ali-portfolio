/* =========================================================
   Ahmed Ali — Advanced QA Portfolio
   Final Interactions & Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     External Link Security
     ======================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });


  /* =======================================================
     CV Dropdowns
     ======================================================= */

  const cvDropdowns =
    document.querySelectorAll(".cv-dropdown");

  cvDropdowns.forEach((dropdown) => {

    const toggle =
      dropdown.querySelector(".cv-toggle");

    const menu =
      dropdown.querySelector(".cv-menu");

    if (!toggle || !menu) {
      return;
    }


    toggle.addEventListener("click", (event) => {

      event.stopPropagation();

      const isOpen =
        dropdown.classList.contains("open");


      /* Close all dropdowns first */

      cvDropdowns.forEach((item) => {

        item.classList.remove("open");

        const itemToggle =
          item.querySelector(".cv-toggle");

        if (itemToggle) {
          itemToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });


      /* Open clicked dropdown */

      if (!isOpen) {

        dropdown.classList.add("open");

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });


    /* Prevent menu click from instantly closing */

    menu.addEventListener("click", (event) => {
      event.stopPropagation();
    });


    /* Close after clicking a CV */

    menu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        dropdown.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  });


  /* Close dropdown when clicking outside */

  document.addEventListener("click", () => {

    cvDropdowns.forEach((dropdown) => {

      dropdown.classList.remove("open");

      const toggle =
        dropdown.querySelector(".cv-toggle");

      if (toggle) {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  });


  /* Close dropdown with Escape */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
      return;
    }

    cvDropdowns.forEach((dropdown) => {

      dropdown.classList.remove("open");

      const toggle =
        dropdown.querySelector(".cv-toggle");

      if (toggle) {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  });


  /* =======================================================
     Reveal On Scroll
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

  }


  /* =======================================================
     Hero Entrance Animation
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
                "translateY(25px)"
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
              120 + index * 110,

            easing:
              "cubic-bezier(.2,.7,.2,1)",

            fill: "both"
          }

        );

      }
    );

  }


  /* =======================================================
     Active Navbar Section
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "#projects, #experience, #skills, #certifications, #languages, #contact"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  const sectionObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          navLinks.forEach((link) => {

            link.classList.remove(
              "active"
            );

            const target =
              link.getAttribute("href");


            if (
              target ===
              `#${entry.target.id}`
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        });

      },

      {
        threshold: 0.25,

        rootMargin:
          "-20% 0px -55% 0px"
      }

    );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     Navbar Scroll Effect
     ======================================================= */

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (!navbar) {
      return;
    }


    if (window.scrollY > 40) {

      navbar.style.background =
        "rgba(5, 9, 13, 0.92)";

      navbar.style.boxShadow =
        "0 8px 40px rgba(0,0,0,0.18)";

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
     Hero Mouse Parallax
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
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

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
          `translate3d(
            ${x * 10}px,
            ${y * 8}px,
            0
          )`;

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
     Project Card Interactive Hover
     ======================================================= */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );


  if (
    !reducedMotion &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
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
     Language Card Stagger
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
     Skill Card Stagger
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
     Smooth Internal Navigation
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
     Back To Top
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
     Logo Back To Top
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
     Background Mouse Parallax
     ======================================================= */

  const background =
    document.querySelector(
      ".page-bg"
    );


  if (
    background &&
    !reducedMotion &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

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
     Console Signature
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
