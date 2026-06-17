const workSections = [
  {
    id: "trabajos-piletas",
    eyebrow: "Piletas",
    title: "Piletas a medida",
    description:
      "Dise\u00f1amos y construimos piletas modernas con soluciones t\u00e9cnicas, est\u00e9ticas y de confort para cada espacio.",
    items: [
      {
        image: "assets/work-nordelta.png",
        location: "Nordelta, Buenos Aires",
        title: "Pileta familiar con borde infinito",
        description:
          "Un dise\u00f1o amplio y luminoso, pensado para integrar el jard\u00edn con una experiencia de descanso premium.",
      },
      {
        image: "assets/work-pilar.png",
        location: "Pilar, Buenos Aires",
        title: "Dise\u00f1o moderno residencial",
        description:
          "L\u00edneas limpias, sol\u00e1rium integrado y terminaciones claras para un exterior elegante y funcional.",
      },
      {
        image: "assets/work-san-isidro.png",
        location: "San Isidro, Buenos Aires",
        title: "Pileta compacta de alta gama",
        description:
          "Una soluci\u00f3n refinada para patios residenciales, con foco en proporci\u00f3n, materiales y confort visual.",
      },
      {
        image: "assets/work-tigre.png",
        location: "Tigre, Buenos Aires",
        title: "Lap pool minimalista",
        description:
          "Dise\u00f1o lineal con agua turquesa, escalones integrados y una presencia serena para exteriores modernos.",
      },
      {
        image: "assets/work-pool-cascada.png",
        location: "Buenos Aires",
        title: "Con cascada",
        description:
          "Incorporamos ca\u00eddas de agua para sumar movimiento, sonido y una experiencia visual m\u00e1s envolvente.",
      },
      {
        image: "assets/work-pool-venecitas.png",
        location: "Buenos Aires",
        title: "Venecitas",
        description:
          "Revestimientos con mosaicos que potencian el color del agua y aportan una terminaci\u00f3n durable y artesanal.",
      },
      {
        image: "assets/work-pool-jacuzzi.png",
        location: "Buenos Aires",
        title: "Hidromasaje / jacuzzi",
        description:
          "Zonas de relax integradas a la pileta, pensadas para sumar confort sin romper la armon\u00eda del dise\u00f1o.",
      },
      {
        image: "assets/work-pool-calefaccionada.png",
        location: "Buenos Aires",
        title: "Calefaccionadas",
        description:
          "Sistemas de climatizaci\u00f3n para extender el uso de la pileta y disfrutarla durante m\u00e1s meses del a\u00f1o.",
      },
    ],
  },
  {
    id: "trabajos-paisajismo",
    eyebrow: "Paisajismo / Dise\u00f1o de jard\u00edn",
    title: "Jardines que completan el proyecto",
    description:
      "Planificamos el entorno para que plantas, canteros, estilo y decoraci\u00f3n acompa\u00f1en la pileta con coherencia.",
    items: [
      {
        image: "assets/work-paisajismo-cantero.png",
        title: "Canteros",
        description:
          "Canteros dise\u00f1ados por capas, con bordes cuidados y especies elegidas para ordenar visualmente el jard\u00edn.",
      },
      {
        image: "assets/work-paisajismo-plantas.png",
        title: "Plantas",
        description:
          "Selecci\u00f3n de especies seg\u00fan luz, mantenimiento y estilo, buscando textura, color y continuidad todo el a\u00f1o.",
      },
      {
        image: "assets/work-paisajismo-estilo-jardin.png",
        title: "Estilo del jard\u00edn",
        description:
          "Definimos recorridos, proporciones y lenguaje visual para que el exterior se sienta integrado y natural.",
      },
      {
        image: "assets/work-paisajismo-decoracion.png",
        title: "Decoraci\u00f3n",
        description:
          "Macetas, luminarias y detalles exteriores que terminan de vestir el espacio sin recargarlo.",
      },
    ],
  },
  {
    id: "trabajos-madera",
    eyebrow: "Madera",
    title: "Madera para exteriores",
    description:
      "Sumamos calidez y funcionalidad con piezas de madera pensadas para convivir con agua, jard\u00edn y uso diario.",
    items: [
      {
        image: "assets/work-madera-cable-estacado.png",
        title: "Cable estacado",
        description:
          "Barandas y cerramientos con postes de madera y cables tensados para una protecci\u00f3n liviana y moderna.",
      },
      {
        image: "assets/work-madera-muelle.png",
        title: "Muelle",
        description:
          "Muelles de madera con estructura firme, terminaci\u00f3n c\u00e1lida y presencia natural sobre el agua.",
      },
      {
        image: "assets/work-madera-deck.png",
        title: "Deck",
        description:
          "Decks exteriores que conectan pileta, sol\u00e1rium y jard\u00edn con una superficie c\u00f3moda y resistente.",
      },
      {
        image: "assets/work-madera-pergola.png",
        title: "P\u00e9rgola",
        description:
          "P\u00e9rgolas de madera para generar sombra, estructura y un punto de encuentro en el espacio exterior.",
      },
    ],
  },
];

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#mainMenu");
const workCategories = document.querySelector("#workCategories");
const workCarouselState = {};
const poolBuilder = document.querySelector("#poolBuilder");
const poolSummary = document.querySelector("#poolSummary");
const poolSummaryHelp = document.querySelector("#poolSummaryHelp");
const poolWhatsappLink = document.querySelector("#poolWhatsappLink");
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
const WHATSAPP_NUMBER = "5491132665000";
const POOL_DEPTH = "0.8 mts a 1.60 mts";
const builderGroups = [
  {
    id: "size",
    title: "Tama\u00f1o",
    type: "radio",
    required: true,
    options: ["2x2 hidromasaje", "7x3", "8x4", "10x5", "Pileta ol\u00edmpica"],
  },
  {
    id: "infinityEdge",
    title: "Borde infinito",
    type: "checkbox",
    options: ["S\u00ed"],
  },
  {
    id: "wetBeach",
    title: "Playa h\u00fameda",
    type: "radio",
    options: ["Con playa h\u00fameda", "Sin playa h\u00fameda"],
  },
  {
    id: "finish",
    title: "Revestimiento",
    type: "radio",
    required: true,
    options: ["Venecita", "Piedra Bali", "S\u00edmil Bali", "Travertino", "M\u00e1rmol cementicio pulido"],
  },
  {
    id: "extras",
    title: "Extras",
    type: "checkbox",
    options: ["Solarium", "Cascada natural", "Cascada metal", "Cascada laminar", "Calefaccionada", "Luces"],
  },
];
const builderState = {
  size: "",
  infinityEdge: [],
  wetBeach: "Sin playa h\u00fameda",
  finish: "",
  extras: [],
};

function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 24 || header.classList.contains("page-header"));
}

function toggleMenu() {
  if (!navLinks || !header || !menuToggle) {
    return;
  }

  const isOpen = navLinks.classList.toggle("open");
  header.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  if (!navLinks || !header || !menuToggle) {
    return;
  }

  navLinks.classList.remove("open");
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function buildWorkSections() {
  if (!workCategories) {
    return;
  }

  workCategories.innerHTML = workSections
    .map(
      (section) => `
        <section class="work-category" aria-labelledby="${section.id}">
          <div class="work-category-heading">
            <p class="eyebrow">${section.eyebrow}</p>
            <h3 id="${section.id}">${section.title}</h3>
            <p>${section.description}</p>
          </div>
          <div class="work-carousel" data-section-id="${section.id}" aria-roledescription="carrusel">
            <div class="work-carousel-viewport">
              <div class="work-carousel-track" data-carousel-track>
                ${section.items
                  .map(
                    (item) => `
                      <article class="work-slide" aria-label="${item.title}">
                        <div class="work-slide-inner">
                          <img class="work-slide-image" src="${item.image}" alt="${item.title}" />
                          <div class="work-slide-copy">
                            <span>${item.location || section.eyebrow}</span>
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                          </div>
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>
            <div class="work-carousel-controls" aria-label="Controles de ${section.title}">
              <button class="icon-btn" type="button" data-carousel-prev aria-label="Trabajo anterior">
                <span aria-hidden="true">&#8249;</span>
              </button>
              <button class="icon-btn" type="button" data-carousel-next aria-label="Trabajo siguiente">
                <span aria-hidden="true">&#8250;</span>
              </button>
            </div>
            <div class="work-carousel-dots" data-carousel-dots aria-label="Indicadores">
              ${section.items
                .map(
                  (_, index) => `
                    <button class="carousel-dot" type="button" aria-label="Ver trabajo ${index + 1}" data-carousel-dot="${index}"></button>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>
      `
    )
    .join("");

  workSections.forEach((section) => {
    workCarouselState[section.id] = 0;
    updateWorkCarousel(section.id);
  });
}

function updateWorkCarousel(sectionId) {
  if (!workCategories) {
    return;
  }

  const carousel = workCategories.querySelector(`[data-section-id="${sectionId}"]`);

  if (!carousel) {
    return;
  }

  const currentIndex = workCarouselState[sectionId] || 0;
  carousel.querySelector("[data-carousel-track]").style.transform = `translateX(-${currentIndex * 100}%)`;
  carousel.querySelectorAll("[data-carousel-dot]").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
    dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });
}

function showWorkSlide(sectionId, index) {
  const section = workSections.find((workSection) => workSection.id === sectionId);

  if (!section) {
    return;
  }

  workCarouselState[sectionId] = (index + section.items.length) % section.items.length;
  updateWorkCarousel(sectionId);
}

function handleWorkCarouselClick(event) {
  const carousel = event.target.closest(".work-carousel");

  if (!carousel) {
    return;
  }

  const sectionId = carousel.dataset.sectionId;
  const currentIndex = workCarouselState[sectionId] || 0;
  const dot = event.target.closest("[data-carousel-dot]");

  if (event.target.closest("[data-carousel-prev]")) {
    showWorkSlide(sectionId, currentIndex - 1);
  } else if (event.target.closest("[data-carousel-next]")) {
    showWorkSlide(sectionId, currentIndex + 1);
  } else if (dot) {
    showWorkSlide(sectionId, Number(dot.dataset.carouselDot));
  }
}

function getBuilderInputId(groupId, option) {
  return `pool-${groupId}-${option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function buildPoolBuilder() {
  if (!poolBuilder) {
    return;
  }

  poolBuilder.innerHTML = `
    ${builderGroups
      .map(
        (group) => `
          <fieldset class="builder-group">
            <legend>
              ${group.title}
              ${group.required ? '<span class="required-mark">Obligatorio</span>' : ""}
            </legend>
            <div class="builder-options ${group.type === "checkbox" ? "is-multiple" : ""}">
              ${group.options
                .map((option) => {
                  const inputId = getBuilderInputId(group.id, option);
                  const isChecked = group.type === "radio"
                    ? builderState[group.id] === option
                    : builderState[group.id].includes(option);

                  return `
                    <label class="builder-option ${isChecked ? "selected" : ""}" for="${inputId}">
                      <input
                        id="${inputId}"
                        type="${group.type}"
                        name="${group.id}"
                        value="${option}"
                        ${isChecked ? "checked" : ""}
                      />
                      <span>${option}</span>
                    </label>
                  `;
                })
                .join("")}
            </div>
          </fieldset>
        `
      )
      .join("")}
    <div class="builder-depth">
      <span>Profundidad est\u00e1ndar</span>
      <strong>${POOL_DEPTH}</strong>
    </div>
  `;

  updatePoolSummary();
}

function handleBuilderChange(event) {
  const input = event.target.closest("input");

  if (!input || !poolBuilder.contains(input)) {
    return;
  }

  if (input.type === "radio") {
    builderState[input.name] = input.value;
  } else if (input.type === "checkbox") {
    const currentValues = new Set(builderState[input.name]);
    currentValues[input.checked ? "add" : "delete"](input.value);
    builderState[input.name] = [...currentValues];
  }

  poolBuilder.querySelectorAll(`input[name="${input.name}"]`).forEach((field) => {
    field.closest(".builder-option").classList.toggle("selected", field.checked);
  });
  updatePoolSummary();
}

function getBuilderMissingFields() {
  return [
    !builderState.size ? "tama\u00f1o" : "",
    !builderState.finish ? "revestimiento" : "",
  ].filter(Boolean);
}

function getBuilderSummaryRows() {
  return [
    ["Tama\u00f1o", builderState.size || "Pendiente"],
    ["Borde infinito", builderState.infinityEdge.length ? "S\u00ed" : "No"],
    ["Playa h\u00fameda", builderState.wetBeach || "Sin definir"],
    ["Revestimiento", builderState.finish || "Pendiente"],
    ["Profundidad est\u00e1ndar", POOL_DEPTH],
    ["Extras", builderState.extras.length ? builderState.extras.join(", ") : "Sin extras"],
  ];
}

function getBuilderWhatsappMessage() {
  return [
    "Hola ProPools, quiero consultar por esta piscina:",
    `Tama\u00f1o: ${builderState.size}`,
    `Borde infinito: ${builderState.infinityEdge.length ? "S\u00ed" : "No"}`,
    `Playa h\u00fameda: ${builderState.wetBeach}`,
    `Revestimiento: ${builderState.finish}`,
    `Profundidad est\u00e1ndar: ${POOL_DEPTH}`,
    `Extras: ${builderState.extras.length ? builderState.extras.join(", ") : "Sin extras"}`,
    "\u00bfMe pueden pasar presupuesto?",
  ].join("\n");
}

function updatePoolSummary() {
  if (!poolSummary || !poolSummaryHelp || !poolWhatsappLink) {
    return;
  }

  const missingFields = getBuilderMissingFields();
  const isReady = missingFields.length === 0;
  poolSummary.innerHTML = getBuilderSummaryRows()
    .map(
      ([label, value]) => `
        <div class="summary-row">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `
    )
    .join("");

  poolSummaryHelp.textContent = isReady
    ? "Listo para enviar la consulta por WhatsApp."
    : `Eleg\u00ed ${missingFields.join(" y ")} para habilitar WhatsApp.`;

  if (isReady) {
    poolWhatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(getBuilderWhatsappMessage())}`;
    poolWhatsappLink.removeAttribute("aria-disabled");
    poolWhatsappLink.classList.remove("is-disabled");
  } else {
    poolWhatsappLink.href = "#";
    poolWhatsappLink.setAttribute("aria-disabled", "true");
    poolWhatsappLink.classList.add("is-disabled");
  }
}

function handleBuilderSubmit(event) {
  if (poolWhatsappLink?.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
  }
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
    setFieldError(field, "Ingres\u00e1 un email v\u00e1lido.");
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
    setFormStatus("EmailJS no carg\u00f3 correctamente. Recarga la p\u00e1gina e intenta nuevamente.", true);
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
      "No se pudo enviar la consulta con EmailJS. Revisa la configuraci\u00f3n de la cuenta e intenta nuevamente.",
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

buildWorkSections();
buildPoolBuilder();
updateHeaderState();
initRevealAnimations();

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
menuToggle?.addEventListener("click", toggleMenu);
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
workCategories?.addEventListener("click", handleWorkCarouselClick);
poolBuilder?.addEventListener("change", handleBuilderChange);
poolWhatsappLink?.addEventListener("click", handleBuilderSubmit);
contactForm?.addEventListener("submit", handleSubmit);
contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.closest(".form-row").classList.contains("error")) {
      validateField(field);
    }
  });
});
