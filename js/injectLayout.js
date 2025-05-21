// Function to inject header and footer
document.addEventListener("DOMContentLoaded", function () {
  // Inject header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".header-container").innerHTML = data;
      initMobileMenu();
    })
    .catch((error) => console.error("Error loading header:", error));

  // Inject footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".footer-container").innerHTML = data;
      // Set current year in footer
      const currentYear = new Date().getFullYear();
      document.getElementById("current-year").textContent = currentYear;
    })
    .catch((error) => console.error("Error loading footer:", error));

  // Show cookie bar if not accepted
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      const cookieBar = document.querySelector(".cookie-bar");
      cookieBar.classList.add("active");
    }, 1000);
  }
});

function initMobileMenu() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll"); // ← добавили это
    });
  }

  // Handle Run Flow link for smooth scrolling
  const runFlowLinks = document.querySelectorAll(".run-flow-link");
  runFlowLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply smooth scroll if on the homepage
      if (
        window.location.pathname === "/" ||
        window.location.pathname.includes("index.html")
      ) {
        e.preventDefault();
        const targetId = this.getAttribute("href").split("#")[1];
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Close mobile menu if open
          if (mobileMenu.classList.contains("active")) {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.classList.remove("no-scroll"); // ← и это
          }

          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Handle cookie bar buttons
  const acceptButton = document.querySelector(".cookie-accept");
  const declineButton = document.querySelector(".cookie-decline");
  const cookieBar = document.querySelector(".cookie-bar");

  if (acceptButton && declineButton) {
    acceptButton.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBar.classList.remove("active");
    });

    declineButton.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "false");
      cookieBar.classList.remove("active");
    });
  }
}
