const projects = [
  {
    image: "assets/work-nordelta.png",
    location: "Nordelta, Buenos Aires",
    title: "Pileta familiar con borde infinito",
    description:
      "Un diseño amplio y luminoso, pensado para integrar el jardín con una experiencia de descanso premium.",
  },
  {
    image: "assets/work-pilar.png",
    location: "Pilar, Buenos Aires",
    title: "Diseño moderno para jardín residencial",
    description:
      "Líneas limpias, solárium integrado y terminaciones claras para un exterior elegante y funcional.",
  },
  {
    image: "assets/work-san-isidro.png",
    location: "San Isidro, Buenos Aires",
    title: "Pileta compacta de alta gama",
    description:
      "Una solución refinada para patios residenciales, con foco en proporción, materiales y confort visual.",
  },
  {
    image: "assets/work-tigre.png",
    location: "Tigre, Buenos Aires",
    title: "Lap pool con estética minimalista",
    description:
      "Diseño lineal con agua turquesa, escalones integrados y una presencia serena para exteriores modernos.",
  },
];

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#mainMenu");
const carouselTrack = document.querySelector("#carouselTrack");
const carouselDots = document.querySelector("#carouselDots");
const prevProject = document.querySelector("#prevProject");
const nextProject = document.querySelector("#nextProject");
const contactForm = document.querySelector("#contactForm");
const formSuccess = document.querySelector("#formSuccess");
const formSubmitButton = document.querySelector("#formSubmitButton");
const year = document.querySelector("#year");
const defaultSubmitLabel = formSubmitButton?.textContent || "Enviar consulta";
const CONTACT_RATE_LIMIT_KEY = "propools_last_contact_at";
const CONTACT_RATE_LIMIT_MS = 2 * 60 * 1000;
const emailJsConfig = {
  serviceId: contactForm?.dataset.emailjsServiceId || "",
  templateId: contactForm?.dataset.emailjsTemplateId || "",
  publicKey: contactForm?.dataset.emailjsPublicKey || "",
};

let currentProject = 0;

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  header.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  navLinks.classList.remove("open");
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function buildCarousel() {
  carouselTrack.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card" aria-label="${project.title}">
          <div class="project-card-inner">
            <img class="project-image" src="${project.image}" alt="${project.title} en ${project.location}" />
            <div class="project-info">
              <span>${project.location}</span>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  carouselDots.innerHTML = projects
    .map(
      (_, index) => `
        <button class="carousel-dot" type="button" aria-label="Ver trabajo ${index + 1}" data-index="${index}"></button>
      `
    )
    .join("");
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentProject * 100}%)`;
  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentProject);
    dot.setAttribute("aria-current", index === currentProject ? "true" : "false");
  });
}

function showProject(index) {
  currentProject = (index + projects.length) % projects.length;
  updateCarousel();
}

function setFieldError(field, message) {
  const row = field.closest(".form-row");
  row.classList.toggle("error", Boolean(message));
  row.querySelector("small").textContent = message;
}

function validateField(field) {
  const value = field.value.trim();
  const maxLength = Number(field.getAttribute("maxlength")) || 0;

  if (!value) {
    setFieldError(field, "Este campo es obligatorio.");
    return false;
  }

  if (maxLength > 0 && value.length > maxLength) {
    setFieldError(field, "El contenido ingresado es demasiado largo.");
    return false;
  }

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setFieldError(field, "Ingresá un email válido.");
    return false;
  }

  setFieldError(field, "");
  return true;
}

function setFormStatus(message, isError = false) {
  formSuccess.textContent = message;
  formSuccess.classList.toggle("is-error", isError);
}

function setFormLoadingState(isLoading) {
  if (!formSubmitButton) {
    return;
  }

  formSubmitButton.disabled = isLoading;
  formSubmitButton.textContent = isLoading ? "Enviando consulta..." : defaultSubmitLabel;
}

function getRateLimitRemainingMs() {
  const lastSentAt = Number(localStorage.getItem(CONTACT_RATE_LIMIT_KEY) || "0");
  const elapsed = Date.now() - lastSentAt;
  return Math.max(0, CONTACT_RATE_LIMIT_MS - elapsed);
}

function setRateLimitTimestamp() {
  localStorage.setItem(CONTACT_RATE_LIMIT_KEY, String(Date.now()));
}

async function handleSubmit(event) {
  event.preventDefault();
  setFormStatus("");

  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const isValid = fields.every(validateField);

  if (!isValid) {
    return;
  }

  const remainingMs = getRateLimitRemainingMs();
  if (remainingMs > 0) {
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    setFormStatus(
      `Debes esperar ${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""} antes de enviar otra consulta.`,
      true
    );
    return;
  }

  if (
    !emailJsConfig.serviceId ||
    !emailJsConfig.templateId ||
    !emailJsConfig.publicKey ||
    emailJsConfig.serviceId.includes("REEMPLAZAR_") ||
    emailJsConfig.templateId.includes("REEMPLAZAR_") ||
    emailJsConfig.publicKey.includes("REEMPLAZAR_")
  ) {
    setFormStatus(
      "Falta configurar EmailJS. Reemplaza los datos REEMPLAZAR_SERVICE_ID, REEMPLAZAR_TEMPLATE_ID y REEMPLAZAR_PUBLIC_KEY en index.html.",
      true
    );
    return;
  }

  if (!window.emailjs?.sendForm) {
    setFormStatus("EmailJS no cargó correctamente. Recarga la página e intenta nuevamente.", true);
    return;
  }

  setFormLoadingState(true);

  try {
    await window.emailjs.init({
      publicKey: emailJsConfig.publicKey,
    });
    await window.emailjs.sendForm(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      contactForm
    );

    setRateLimitTimestamp();
    contactForm.reset();
    fields.forEach((field) => setFieldError(field, ""));
    setFormStatus("Gracias por contactarte con ProPools. Te responderemos a la brevedad.");
  } catch (error) {
    setFormStatus(
      "No se pudo enviar la consulta con EmailJS. Revisa la configuración de la cuenta e intenta nuevamente.",
      true
    );
  } finally {
    setFormLoadingState(false);
  }
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

buildCarousel();
updateCarousel();
updateHeaderState();
initRevealAnimations();

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", updateHeaderState, { passive: true });
menuToggle.addEventListener("click", toggleMenu);
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
prevProject.addEventListener("click", () => showProject(currentProject - 1));
nextProject.addEventListener("click", () => showProject(currentProject + 1));
carouselDots.addEventListener("click", (event) => {
  const dot = event.target.closest(".carousel-dot");
  if (dot) {
    showProject(Number(dot.dataset.index));
  }
});
contactForm.addEventListener("submit", handleSubmit);
contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.closest(".form-row").classList.contains("error")) {
      validateField(field);
    }
  });
});
