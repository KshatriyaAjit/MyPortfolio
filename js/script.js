/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");

const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

const scrollProgress =
  document.querySelector(".scroll-progress");


/* =========================================================
   MOBILE NAVBAR
========================================================= */

if (menuIcon && navbar) {

  menuIcon.addEventListener("click", () => {

    menuIcon.classList.toggle("bx-x");

    navbar.classList.toggle("active");

  });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (menuIcon) {
      menuIcon.classList.remove("bx-x");
    }

    if (navbar) {
      navbar.classList.remove("active");
    }

  });

});


/* =========================================================
   SCROLL HANDLER
   Handles:
   1. Sticky navbar
   2. Scroll progress
   3. Active navbar link
========================================================= */

function handleScroll() {

  const scrollY = window.scrollY;


  /* =======================================================
     1. STICKY NAVBAR
  ======================================================= */

  if (header) {

    header.classList.toggle(
      "sticky",
      scrollY > 80
    );

  }


  /* =======================================================
     2. SCROLL PROGRESS
  ======================================================= */

  if (scrollProgress) {

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (documentHeight > 0) {

      const progress =
        (scrollY / documentHeight) * 100;

      scrollProgress.style.width =
        `${Math.min(progress, 100)}%`;

    }

  }


  /* =======================================================
     3. FIND CURRENT SECTION
  ======================================================= */

  let currentSection = "";

  /*
    We use a point slightly below the top of the viewport.

    Example:

    Home
    --------------------------
                ↑
          detection point

    When this point enters About,
    About becomes active.
  */

  const detectionPoint =
    scrollY + 220;


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop;

    if (detectionPoint >= sectionTop) {

      currentSection =
        section.getAttribute("id");

    }

  });


  /* =======================================================
     4. UPDATE ACTIVE NAVBAR LINK
  ======================================================= */

  navLinks.forEach((link) => {

    link.classList.remove("active");

    const href =
      link.getAttribute("href");

    if (
      href === `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}


/* =========================================================
   SCROLL EVENT
========================================================= */

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);


/* =========================================================
   RUN ON INITIAL PAGE LOAD
========================================================= */

handleScroll();


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (typeof ScrollReveal !== "undefined") {

  const sr = ScrollReveal({

    distance: "80px",

    duration: 1200,

    delay: 100,

    reset: false

  });


  /* Hero */

  sr.reveal(
    ".home-content",
    {
      origin: "left"
    }
  );


  sr.reveal(
    ".home-img",
    {
      origin: "right"
    }
  );


  /* Section headings */

  sr.reveal(
    ".heading",
    {
      origin: "top"
    }
  );


  /* About */

  sr.reveal(
    ".about-img",
    {
      origin: "left"
    }
  );


  sr.reveal(
    ".about-content",
    {
      origin: "right"
    }
  );


  /* Skills */

  sr.reveal(
    ".skill-box",
    {
      origin: "bottom",
      interval: 120,
      distance: "40px"
    }
  );


  /* Services */

  sr.reveal(
    ".services-box",
    {
      origin: "bottom",
      interval: 150,
      distance: "50px"
    }
  );


  /* Projects */

  sr.reveal(
    ".project-box",
    {
      origin: "bottom",
      interval: 150,
      distance: "50px"
    }
  );


  /* Contact */

  sr.reveal(
    ".contact form",
    {
      origin: "bottom"
    }
  );

}


/* =========================================================
   TYPED.JS
========================================================= */

if (
  typeof Typed !== "undefined" &&
  document.querySelector(".multiple-text")
) {

  new Typed(
    ".multiple-text",
    {

     strings: [
  "Full Stack Web Developer",
  "React & Node.js Developer",
  "C++ Programmer",
  "Problem Solver"
],

      typeSpeed: 70,

      backSpeed: 50,

      backDelay: 1500,

      loop: true,

      cursorChar: "|"

    }
  );

}


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
  document.querySelectorAll(
    ".progress .bar span"
  );

const skillsSection =
  document.querySelector("#skills");

let skillsAnimated = false;


/* =========================================================
   ANIMATE SKILL BARS
========================================================= */

const animateSkills = () => {

  skillBars.forEach((bar, index) => {

    const targetWidth =
      bar.getAttribute("data-width");

    setTimeout(() => {

      bar.style.width = targetWidth;

    }, index * 80);

  });

};


/* =========================================================
   SKILL SECTION OBSERVER
========================================================= */

if (skillsSection) {

  const skillsObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting &&
            !skillsAnimated
          ) {

            animateSkills();

            skillsAnimated = true;

          }

        });

      },
      {
        threshold: 0.2
      }
    );


  skillsObserver.observe(
    skillsSection
  );

}

