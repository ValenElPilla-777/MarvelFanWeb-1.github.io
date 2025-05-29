// principal.js - Código específico para la página principal

// Control de música principal
window.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-principal');
    const muteBtn = document.getElementById('mute-btn-secundario');
  
    // Asegura que arranque muteada
    musica.muted = true;
  
    // Activa reproducción al primer clic en cualquier parte
    document.body.addEventListener('click', () => {
      musica.play().catch(err => console.log("Error al reproducir música:", err));
    }, { once: true });
  
    // Control del botón de mute
    muteBtn.addEventListener('click', () => {
      musica.muted = !musica.muted;
      muteBtn.textContent = musica.muted ? '🔇' : '🔊';
    });
  });
  
  // Efectos hover para las columnas de video
  document.addEventListener('DOMContentLoaded', () => {
    const videoColumns = document.querySelectorAll('.video-column');
    
    videoColumns.forEach(column => {
      const video = column.querySelector('.video');
      const overlay = column.querySelector('.overlay');
      
      column.addEventListener('mouseenter', () => {
        if (video) {
          video.playbackRate = 1; // Aumenta velocidad al hacer hover
        }
        if (overlay) {
          overlay.style.opacity = '1';
        }
      });
      
      column.addEventListener('mouseleave', () => {
        if (video) {
          video.playbackRate = 1.0; // Vuelve a velocidad normal
        }
        if (overlay) {
          overlay.style.opacity = '0.7';
        }
      });
    });
  });
  
  // Efecto de carga inicial
  window.addEventListener('load', () => {
    const logo = document.getElementById('logo-barra');
    const titulo = document.getElementById('titulo-barra');
    
    if (logo && titulo) {
      logo.style.opacity = '0';
      titulo.style.opacity = '0';
      
      setTimeout(() => {
        logo.style.transition = 'opacity 1s ease-in-out';
        titulo.style.transition = 'opacity 1s ease-in-out';
        logo.style.opacity = '1';
        titulo.style.opacity = '1';
      }, 500);
    }
  });

  