// Main JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  // Load page-specific content from JSON
  loadPageContent();

  // Initialize form validation if on contact page
  if (document.getElementById("contactForm")) {
    initFormValidation();
  }
});

// Function to load page content from JSON
function loadPageContent() {
  const currentPage =
    window.location.pathname.split("/").pop().split(".")[0] || "index";

  // Skip JSON loading for privacy and cookies pages
  if (currentPage === "privacy" || currentPage === "cookies") {
    return;
  }

  fetch(`data/${currentPage}.json`)
    .then((response) => response.json())
    .then((data) => {
      // Set meta tags if available
      if (data.meta) {
        if (data.meta.title) document.title = data.meta.title;
        if (data.meta.description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.setAttribute("name", "description");
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute("content", data.meta.description);
        }
      }

      // Load page-specific content
      switch (currentPage) {
        case "index":
          loadHomepageContent(data);
          break;
        case "news":
          loadNewsContent(data);
          break;
        case "disclaimer":
          loadDisclaimerContent(data);
          break;
        case "contact":
          loadContactContent(data);
          break;
      }
    })
    .catch((error) =>
      console.error(`Error loading ${currentPage} content:`, error)
    );
}

// Function to load homepage content
function loadHomepageContent(data) {
  // Load game sections
  if (data.sections) {
    data.sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const contentContainer =
          sectionElement.querySelector(".section-content");
        if (contentContainer) {
          let html = "";

          if (section.id === "run-flow") {
            // Special handling for Run Flow section
            section.steps.forEach((step, index) => {
              html += `
                                <div class="flow-step">
                                    <div class="flow-icon">${index + 1}</div>
                                    <div class="flow-content">
                                        <h3 class="flow-title">${
                                          step.title
                                        }</h3>
                                        <p class="flow-description">${
                                          step.description
                                        }</p>
                                    </div>
                                </div>
                            `;
            });
          } else {
            // Standard section content
            html = `
                            <div class="section-text">
                                <p>${section.description}</p>
                            </div>
                            <div>
                                <img class="section-image" src="${section.image}" alt="${section.title}">
                            </div>
                        `;
          }

          contentContainer.innerHTML = html;
        }
      }
    });
  }

  // Load testimonials
  if (data.testimonials) {
    const testimonialsContainer = document.querySelector(
      ".testimonials-container"
    );
    if (testimonialsContainer) {
      let html = "";

      data.testimonials.forEach((testimonial) => {
        const gender = Math.random() > 0.5 ? "men" : "women";
        const index = Math.floor(Math.random() * 100); // от 0 до 99
        const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
        html += `
                    <div class="testimonial-card">
                        <p class="testimonial-text">${testimonial.text}</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <img src="${avatarUrl}" alt="testimonial">
                            </div>
                            <div class="author-info">
                                <span class="author-name">${testimonial.name}</span>
                                <span class="author-title">${testimonial.title}</span>
                            </div>
                        </div>
                    </div>
                `;
      });

      testimonialsContainer.innerHTML = html;
    }
  }
}

// Function to load news content
function loadNewsContent(data) {
  if (data.news) {
    const newsContainer = document.querySelector(".news-container");
    if (newsContainer) {
      let html = "";

      data.news.forEach((item) => {
        html += `
                    <div class="news-card">
                        <div class="news-image">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="news-date">${item.date}</div>
                        </div>
                        <div class="news-content">
                            <h2 class="news-card-title">${item.title}</h2>
                            <p class="news-excerpt">${item.excerpt}</p>
                        </div>
                    </div>
                `;
      });

      newsContainer.innerHTML = html;
    }
  }
}

// Function to load disclaimer content
function loadDisclaimerContent(data) {
  if (data.sections) {
    const cautionContent = document.querySelector(".caution-content");
    if (cautionContent) {
      let html = "";

      data.sections.forEach((section) => {
        html += `
                    <div class="caution-section">
                        <h2 class="caution-section-title">${section.title}</h2>
                        <p class="caution-text">${section.description}</p>
                `;

        if (section.items) {
          html += '<ul class="caution-list">';
          section.items.forEach((item) => {
            html += `<li class="caution-list-item">${item}</li>`;
          });
          html += "</ul>";
        }

        if (section.highlight) {
          html += `<div class="caution-highlight">${section.highlight}</div>`;
        }

        html += "</div>";
      });

      cautionContent.innerHTML = html;
    }
  }
}

// Function to load contact content
function loadContactContent(data) {
  // Contact page content is mostly static, but we could load additional info if needed
  if (data.contactInfo) {
    // Update contact information if provided in JSON
  }
}

// Function to initialize form validation
function initFormValidation() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required");
      isValid = false;
    } else {
      showSuccess(nameInput);
    }

    // Validate email
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    // Validate subject
    if (subjectInput.value.trim() === "") {
      showError(subjectInput, "Subject is required");
      isValid = false;
    } else {
      showSuccess(subjectInput);
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message is required");
      isValid = false;
    } else {
      showSuccess(messageInput);
    }

    // If form is valid, submit it (or show success message)
    if (isValid) {
      // In a real application, you would send the form data to a server
      alert("Message sent successfully!");
      form.reset();

      // Remove success classes
      nameInput.classList.remove("success");
      emailInput.classList.remove("success");
      subjectInput.classList.remove("success");
      messageInput.classList.remove("success");
    }
  });

  // Real-time validation
  nameInput.addEventListener("input", function () {
    if (nameInput.value.trim() !== "") {
      showSuccess(nameInput);
    } else {
      showError(nameInput, "Name is required");
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required");
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
    } else {
      showSuccess(emailInput);
    }
  });

  subjectInput.addEventListener("input", function () {
    if (subjectInput.value.trim() !== "") {
      showSuccess(subjectInput);
    } else {
      showError(subjectInput, "Subject is required");
    }
  });

  messageInput.addEventListener("input", function () {
    if (messageInput.value.trim() !== "") {
      showSuccess(messageInput);
    } else {
      showError(messageInput, "Message is required");
    }
  });
}

// Helper function to show error
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  input.classList.add("error");
  input.classList.remove("success");
  errorMessage.textContent = message;
}

// Helper function to show success
function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  input.classList.remove("error");
  input.classList.add("success");
  errorMessage.textContent = "";
}

// Helper function to validate email
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookieBar");
  const acceptBtn = document.getElementById("acceptCookies");

  // Показываем только если не принято
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBar.style.display = "flex";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBar.style.display = "none";
  });
});
