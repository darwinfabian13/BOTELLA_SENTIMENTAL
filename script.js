const mensajes = {
  feliz: [
    "Hoy estás radiante, como siempre 🌟",
    "Tu alegría es contagiosa, gracias por compartirla 😄"
  ],
  triste: [
    "Está bien no estar bien. Estoy aquí para ti 💙",
    "A veces llorar también es sanar. Respira profundo."
  ],
  enojada: [
    "Respira, suelta, no estás sola. Esto también pasará 🔥",
    "Tu enojo es válido. Pero no te olvides de cuidar tu paz."
  ],
  aburrida: [
    "A veces el descanso es lo que el alma necesita ☁️",
    "Tal vez hoy no pase nada... y eso también está bien."
  ],
  ansiosa: [
    "Un paso a la vez. Eres fuerte 🫶",
    "Respira conmigo. Inhala... Exhala... Ya estás mejor."
  ]
};

let emocionActual = "";

document.querySelectorAll("button[data-emocion]").forEach(boton => {
  boton.addEventListener("click", () => {
    emocionActual = boton.dataset.emocion;
    mostrarMensaje(emocionActual);
  });
});

function mostrarMensaje(emocion) {
  const mensaje = obtenerMensajeAleatorio(emocion);
  document.getElementById("mensajeTexto").textContent = mensaje;
  document.getElementById("mensajeContainer").classList.remove("oculto");
  document.getElementById("notaContainer").classList.add("oculto");
}

function obtenerMensajeAleatorio(emocion) {
  const lista = mensajes[emocion];
  const i = Math.floor(Math.random() * lista.length);
  return lista[i];
}

document.getElementById("escribirNota").addEventListener("click", () => {
  document.getElementById("notaContainer").classList.remove("oculto");
});

document.getElementById("omitirMensaje").addEventListener("click", () => {
  document.getElementById("mensajeContainer").classList.add("oculto");
  document.getElementById("notaContainer").classList.add("oculto");
});

document.getElementById("guardarNota").addEventListener("click", () => {
  const textoNota = document.getElementById("notaTexto").value.trim();
  const mensaje = document.getElementById("mensajeTexto").textContent;

  if (textoNota === "") return;

  const nuevaNota = {
    emocion: emocionActual,
    mensaje: mensaje,
    nota: textoNota,
    fecha: new Date().toLocaleString()
  };

  const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
  notasGuardadas.push(nuevaNota);
  localStorage.setItem("notas", JSON.stringify(notasGuardadas));

  document.getElementById("notaTexto").value = "";
  document.getElementById("mensajeContainer").classList.add("oculto");
  document.getElementById("notaContainer").classList.add("oculto");
});

document.getElementById("verNotas").addEventListener("click", mostrarNotas);

function mostrarNotas() {
  const contenedor = document.getElementById("historialNotas");
  contenedor.innerHTML = "";
  const notas = JSON.parse(localStorage.getItem("notas")) || [];

  if (notas.length === 0) {
    contenedor.innerHTML = "<p>No hay notas guardadas todavía.</p>";
    return;
  }

  notas.forEach(nota => {
    const div = document.createElement("div");
    div.classList.add("nota", nota.emocion);
    div.innerHTML = `
      <strong>${nota.emocion.toUpperCase()}</strong><br>
      <em>${nota.fecha}</em><br>
      <p><strong>Mensaje:</strong> ${nota.mensaje}</p>
      <p><strong>Tu nota:</strong> ${nota.nota}</p>
    `;
    contenedor.appendChild(div);
  });
}
