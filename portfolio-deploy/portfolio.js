/* Esther Wang — Portfolio interactions */
(function () {
  "use strict";

  /* Mark JS active so reveal-hiding CSS only applies when JS can un-hide it */
  document.documentElement.classList.add("js");

  /* ---- Hero entrance (setTimeout, not rAF — fires even in unpainted frames) ---- */
  var hero = document.getElementById("hero");
  if (hero) setTimeout(function () { hero.classList.add("go"); }, 40);

  /* ---- Nav: shadow on scroll + mobile toggle ---- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
  if (navLinks) {
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---- Scrollspy: highlight the active nav link ---- */
  (function () {
    var spyLinks = [].slice.call(
      document.querySelectorAll('.nav__links a[href^="#"]:not(.nav__cta)')
    );
    if (!spyLinks.length) return;
    var map = spyLinks
      .map(function (a) {
        var sec = document.querySelector(a.getAttribute("href"));
        return sec ? { link: a, sec: sec } : null;
      })
      .filter(Boolean);
    if (!map.length) return;

    function setActive(link) {
      map.forEach(function (m) {
        var on = m.link === link;
        m.link.classList.toggle("is-active", on);
        if (on) m.link.setAttribute("aria-current", "true");
        else m.link.removeAttribute("aria-current");
      });
    }

    function onSpy() {
      var probe = window.scrollY + window.innerHeight * 0.32;
      var current = null;
      map.forEach(function (m) {
        if (m.sec.offsetTop <= probe) current = m.link;
      });
      // Near the very bottom, force the last tracked section active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = map[map.length - 1].link;
      }
      setActive(current);
    }

    window.addEventListener("scroll", onSpy, { passive: true });
    window.addEventListener("resize", onSpy);
    onSpy();
  })();

  /* ---- Scroll reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    /* Safety lock: never leave above-the-fold content stuck hidden.
       Reveals + statically locks in-viewport elements (transition-independent),
       while below-the-fold elements keep their scroll-reveal animation. */
    setTimeout(function () {
      if (hero) {
        hero.classList.add("go");
        Array.prototype.forEach.call(hero.children, function (c) {
          c.style.transition = "none";
          c.style.opacity = "1";
          c.style.transform = "none";
        });
      }
      revealEls.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("in");
          el.style.transition = "none";
        }
      });
    }, 2200);
  }

  /* ---- Email click-to-copy (no mail client redirect) ---- */
  var emailLink = document.getElementById("emailLink");
  var EMAIL = "eswyl17@gmail.com";
  function copyEmail() {
    var done = function () {
      emailLink.classList.add("is-copied");
      setTimeout(function () { emailLink.classList.remove("is-copied"); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = EMAIL; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }
  if (emailLink) {
    emailLink.addEventListener("click", copyEmail);
    emailLink.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); copyEmail(); }
    });
  }
})();
