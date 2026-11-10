# Parce, ¿un tintico?

Ruta de cafés culturales del Valle de Aburrá. Un proyecto de la Universidad de Antioquia.
Sitio estático para GitHub Pages: HTML, CSS y un poco de JavaScript, sin dependencias ni compilación.

## Estructura

```
index.html              Página única con todas las secciones
assets/css/styles.css   Estilos (paleta y tipografías al inicio del archivo)
assets/js/main.js       Menú móvil, video, mapa táctil y formulario
assets/fonts/           Big Shoulders Stencil Display + Alegreya (alojadas aquí, sin Google Fonts)
assets/img/             Fotos del equipo y favicon
```

## Publicar en GitHub Pages

1. Crea el repositorio público `parce-un-tintico` en tu cuenta.
2. Sube todo el contenido de esta carpeta a la raíz del repo (no la carpeta en sí).
3. En el repo ve a **Settings → Pages**, en *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. En uno o dos minutos queda en `https://cepatinog.github.io/parce-un-tintico/`.

## Formulario de inscripción (FormSubmit)

El formulario envía los datos a **parceuntintico@gmail.com** mediante [FormSubmit](https://formsubmit.co), gratis y sin servidor.

- **Activación (una sola vez):** con la página ya publicada, envía una inscripción de prueba. FormSubmit mandará un correo de confirmación a parceuntintico@gmail.com; abre el enlace *Activate Form*. Desde ese momento llegan todas las inscripciones. La prueba de activación no llega como inscripción.
- **Ocultar el correo (recomendado):** tras activar, FormSubmit te envía un alias aleatorio (por ejemplo `a1b2c3...`). Cámbialo en `assets/js/main.js` (`FORM_ENDPOINT`) y en el `action` del formulario de `index.html`, para que el correo no quede visible para bots.
- Los mensajes llegan con asunto *Nueva inscripción: {café} ({municipio})*, en formato tabla, y al responder le contestas directamente al café.

## Mapa

El mapa es el My Maps "parce, ¿un tintico?" incrustado. Todo lo que edites allí se ve al instante en la web.
Requisito: en My Maps → *Compartir*, el mapa debe estar como **"Cualquier persona con el enlace puede ver"**.

## Cambiar contenidos

- **Cafés de la ruta (sección `#cafes`):** seis cafés del mapa en tarjetas iguales. Otraparte y el Ateneo usan una foto de su sitio oficial; los demás, una foto del sector con licencia libre de Wikimedia Commons (con autor y licencia, como exige la licencia CC BY-SA). Para poner fotos propias, guárdalas en `assets/img/` (unos 1200 px de ancho, horizontales) y cambia el `src`, la etiqueta `cafe__tag` y el crédito.
- **Testimonios:** en la sección `#galeria`, bloque `.testimonio`. Ahora hay uno de ejemplo marcado como tal.
- **Equipo:** sección `#equipo`. Las fotos van a 640 × 800 px (proporción 4:5).
- **Colores:** variables al inicio de `styles.css` (`--tinto`, `--kraft`, `--filtro`, `--cereza`…).
