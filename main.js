/* Parce, ¿un tintico? — interacciones */

// Destino del formulario. Tras activar FormSubmit puedes cambiar el correo
// por el alias aleatorio que ellos te envían (oculta el correo a los bots).
const FORM_ENDPOINT = "https://formsubmit.co/ajax/parceuntintico@gmail.com";
const CONTACT_EMAIL = "parceuntintico@gmail.com";

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    toggle.querySelector(".visually-hidden").textContent = open ? "Cerrar menú" : "Abrir menú";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- Video: carga YouTube solo al tocar ---------- */
document.querySelectorAll(".video-lite").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.videoId;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = "Video de presentación de Parce, ¿un tintico?";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    btn.replaceWith(iframe);
    iframe.focus();
  });
});

/* ---------- Mapa: en táctiles se activa al tocar ---------- */
const mapFrame = document.querySelector(".map-frame");
mapFrame?.querySelector(".map-shield")?.addEventListener("click", () => {
  mapFrame.classList.add("is-active");
});

/* ---------- Galería: si una foto no carga, deja un espacio digno ---------- */
document.querySelectorAll(".gallery__item img").forEach((img) => {
  const markMissing = () => img.closest(".gallery__item").classList.add("is-missing");
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener("error", markMissing);
});

/* ---------- Formulario de inscripción ---------- */
const form = document.getElementById("form-inscripcion");
if (form) {
  const status = form.querySelector(".form__status");
  const submit = form.querySelector('button[type="submit"]');
  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = "form__status" + (kind ? ` is-${kind}` : "");
  };

  form.addEventListener("input", (e) => {
    if (e.target.matches("[aria-invalid]")) e.target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación propia, con mensajes en español
    const invalid = [...form.querySelectorAll("[required]")].filter((el) => !el.checkValidity());
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    if (invalid.length) {
      invalid.forEach((el) => el.setAttribute("aria-invalid", "true"));
      const names = invalid.map((el) => form.querySelector(`label[for="${el.id}"]`)?.childNodes[0].textContent.trim());
      const emailBad = invalid.some((el) => el.type === "email" && el.value);
      setStatus(
        emailBad && invalid.length === 1
          ? "Revisa el correo: parece que le falta algo (ej. nombre@correo.com)."
          : `Completa estos campos: ${names.join(", ")}.`,
        "error"
      );
      invalid[0].focus();
      return;
    }

    // Honeypot anti-spam
    if (form.querySelector('[name="_honey"]').value) return;

    const data = {};
    new FormData(form).forEach((value, key) => {
      if (key === "_honey") return;
      data[key] = data[key] ? `${data[key]}, ${value}` : value;
    });
    data._subject = `Nueva inscripción: ${data["Café"]} (${data["Municipio"]})`;

    submit.disabled = true;
    submit.textContent = "Enviando…";
    setStatus("", null);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || res.status);

      const email = data.email;
      form.reset();
      setStatus(`Inscripción enviada. Te escribiremos pronto a ${email}.`, "ok");
    } catch (err) {
      console.error("Formulario:", err);
      setStatus(
        `No pudimos enviar la inscripción. Revisa tu conexión e inténtalo de nuevo, o escríbenos a ${CONTACT_EMAIL}.`,
        "error"
      );
    } finally {
      submit.disabled = false;
      submit.textContent = "Enviar inscripción";
    }
  });
}

/* ---------- Año del pie ---------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
