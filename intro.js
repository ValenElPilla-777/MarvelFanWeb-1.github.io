// -------- INICIO: Música y botón de mute --------
window.addEventListener('load', () => {
    const sonidoInicio = document.getElementById('sonido-inicio');
    const sonidoEscudo = document.getElementById('sonido-escudo');
    const escudo = document.getElementById('escudo');
    const muteBtn = document.getElementById('mute-btn');
    const tituloInfo = document.getElementById('titulo-info');
    let musicaEmpezo = false;
  
    muteBtn.addEventListener('click', () => {
      if (!musicaEmpezo) {
        sonidoInicio.play().then(() => {
          musicaEmpezo = true;
          muteBtn.textContent = "🔊";
        }).catch((error) => {
          console.warn("Autoplay bloqueado: ", error);
        });
      } else {
        sonidoInicio.muted = !sonidoInicio.muted;
        muteBtn.textContent = sonidoInicio.muted ? "🔇" : "🔊";
      }
    });
  
    // -------- ANIMACIÓN ESCUDO + REDIRECCIÓN --------
    escudo.addEventListener('click', () => {
      sonidoEscudo.play();
  
      escudo.style.animation = "none";
      escudo.style.transition = "transform 1.5s ease-in-out, opacity 1.5s ease-in-out";
      escudo.style.transform = "scale(3)";
      escudo.style.opacity = "0";
  
      // Fade out música
      let fadeOutDuration = 5000;
      let fadeOutInterval = 100;
      let fadeOutStep = 1 / (fadeOutDuration / fadeOutInterval);
      let fadeOutIntervalId = setInterval(() => {
        if (sonidoInicio.volume > 0) {
          sonidoInicio.volume -= fadeOutStep;
        } else {
          clearInterval(fadeOutIntervalId);
        }
      }, fadeOutInterval);
  
      // Mostrar título
      setTimeout(() => {
        tituloInfo.style.display = "block";
      }, 1000);
  
      // Redirección
      setTimeout(() => {
        window.location.href = "principal.html";
      }, 6000);
    });
  });
  
  // -------- FRASES ALEATORIAS DE INTRO --------
  window.addEventListener('load', () => {
    const frases = [
      "Un gran poder conlleva una gran responsabilidad. - Tio Ben",
      "Yo soy Groot. - Groot",
      "Yo soy Iron Man. - Tony Stark",
      "Hulk aplasta. - Hulk",
      "No soy un héroe. Soy un protector. - Doctor Strange",
      "Soy inevitable. - Thanos",
      "No es el fin. Sólo es el principio. – Capitán América",
      "No tengo miedo de morir. Tengo miedo de no vivir lo suficiente. – Iron Man",
      "Los héroes son más que solo personas con poderes. – Luke Cage",
      "Cada día es una lucha, pero los héroes no se rinden. – Daredevil",
      "La justicia siempre tiene un precio. – Punisher",
      "Al final, lo que cuenta es el sacrificio. – Magneto",
      "Nunca te rindas, no importa lo que pase. – Wolverine",
      "¡Todo lo que soy, lo soy por mi familia! – Rocket Raccoon",
      "¡Vengadores, Unidos! – Capitán América",
      "Perdí a todos los que alguna vez amé. – Thor",
      "Las decisiones más difíciles requieren las voluntades más fuertes. – Thanos",
      "Te lo dije, eres un héroe. – Pepper Potts",
      "No es el fin del mundo, es solo el comienzo. – Thor",
      "Te amo 3 millones. – Tony Stark",
      "¿Vuestra madre sabe que usáis sus cortinas? - Tony Stark",
      "Mi nombre es Peter Quill, pero ya me llaman Star-Lord. — Star-Lord",
      "Estoy justo donde debo estar. — Deadpool",
      "Nunca dejes que un problema se convierta en una excusa. — Iron Fist",
      "No puedes detener lo inevitable. — Ultron",
      "No soy un héroe. Soy un agente del caos. — Venom",
      "Lo bueno de ser un dios es que no importa lo que hagas. — Loki",
      "Cualquiera puede ser un héroe, incluso un villano. — Ant-Man",
      "Cuando te conviertes en un héroe, te conviertes en un objetivo. — Spider-Man (Miles Morales)",
      "El destino no puede esperar. — Silver Surfer"
    ];
  
    function obtenerFraseAleatoria() {
      return frases[Math.floor(Math.random() * frases.length)];
    }
  
    function mostrarFrase() {
      const frase = obtenerFraseAleatoria();
      const fraseDiv = document.createElement('div');
      fraseDiv.classList.add('frase');
      fraseDiv.textContent = frase;
  
      const container = document.getElementById('frases-container');
      container.innerHTML = '';
      container.appendChild(fraseDiv);
    }
  
    mostrarFrase();
    setInterval(mostrarFrase, 8000);
  
    // Ocultar frases al hacer clic en escudo
    document.getElementById('escudo').addEventListener('click', () => {
      const frasesContainer = document.getElementById('frases-container');
      if (frasesContainer) {
        frasesContainer.style.display = 'none';
      }
    });
  });
  
  // -------- MÚSICA PRINCIPAL EN OTRAS PÁGINAS --------
  window.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-principal');
    const muteBtn = document.getElementById('mute-btn-secundario');
  
    if (musica) {
      musica.muted = true;
  
      document.body.addEventListener('click', () => {
        musica.play().catch(err => console.log("Error al reproducir música:", err));
      }, { once: true });
  
      muteBtn?.addEventListener('click', () => {
        musica.muted = !musica.muted;
        muteBtn.textContent = musica.muted ? '🔇' : '🔊';
      });
    }
  });
  
  // -------- ANIMACIÓN ESCUDO + REDIRECCIÓN --------
escudo.addEventListener('click', () => {
    // Deshabilitar clics adicionales
    escudo.classList.add('inactive');
    escudo.style.pointerEvents = 'none';
    
    sonidoEscudo.play();
  
    escudo.style.animation = "none";
    escudo.style.transition = "transform 1.5s ease-in-out, opacity 1.5s ease-in-out";
    escudo.style.transform = "scale(3)";
    escudo.style.opacity = "0";
  
    // Fade out música
    let fadeOutDuration = 5000;
    let fadeOutInterval = 100;
    let fadeOutStep = 1 / (fadeOutDuration / fadeOutInterval);
    let fadeOutIntervalId = setInterval(() => {
      if (sonidoInicio.volume > 0) {
        sonidoInicio.volume -= fadeOutStep;
      } else {
        clearInterval(fadeOutIntervalId);
      }
    }, fadeOutInterval);
  
    // Mostrar título
    setTimeout(() => {
      tituloInfo.style.display = "block";
    }, 1000);
  
    // Redirección
    setTimeout(() => {
      window.location.href = "principal.html";
    }, 6000);
  });