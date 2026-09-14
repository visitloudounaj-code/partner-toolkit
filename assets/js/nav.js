/* Highlights the sticky nav link for whichever section is currently in view.
   Progressive enhancement only — the site is fully usable without this file. */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.sectionnav a[href^="#"]')
  );
  if (!links.length) return;

  var sections = [];
  var linkFor = {};

  links.forEach(function (link) {
    var section = document.getElementById(link.getAttribute("href").slice(1));
    if (!section) return;
    sections.push(section);
    linkFor[section.id] = link;
  });
  if (!sections.length) return;

  var currentId = null;

  function setCurrent(id) {
    if (id === currentId) return;
    currentId = id;
    links.forEach(function (link) {
      link.removeAttribute("aria-current");
    });
    if (linkFor[id]) linkFor[id].setAttribute("aria-current", "true");
  }

  function navOffset() {
    var nav = document.querySelector(".sectionnav");
    return (nav ? nav.getBoundingClientRect().height : 56) + 24;
  }

  function update() {
    var offset = navOffset();

    // At the very bottom of the page the last section may never reach the
    // offset line, so claim it explicitly.
    var atBottom =
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 2;

    if (atBottom) {
      setCurrent(sections[sections.length - 1].id);
      return;
    }

    // The active section is the last one whose top has passed the offset line.
    var active = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= offset) {
        active = sections[i];
      }
    }

    setCurrent(active ? active.id : null);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
