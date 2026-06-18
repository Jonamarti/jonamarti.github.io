document.addEventListener('DOMContentLoaded', function () {

  // === Hamburger menu toggle ===
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.querySelector('nav ul');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('show');
      hamburger.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('open');
      }
    });
  }

  // === Touch-friendly dropdown (works on tap, not just hover) ===
  var dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('.dropbtn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        dd.classList.toggle('dropdown-open');

        dropdowns.forEach(function (other) {
          if (other !== dd) {
            other.classList.remove('dropdown-open');
          }
        });
      });
    }

    dd.addEventListener('mouseleave', function () {
      dd.classList.remove('dropdown-open');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('dropdown-open');
      }
    });
  });

});
