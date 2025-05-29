document.addEventListener('DOMContentLoaded', function() {
    // 1. Selección de elementos
    const btnPeliculas = document.getElementById('btn-peliculas');
    const btnSeries = document.getElementById('btn-series');
    const btnXmen = document.getElementById('btn-xmen');
    const btnSony = document.getElementById('btn-sony');
    const btnOtro = document.getElementById('btn-otro');
    const btnTodas = document.getElementById('btn-todas');
    const muteBtn = document.getElementById('mute-btn-secundario');
    
    const todasTarjetas = document.querySelectorAll('.tarjeta');
    const todasCategorias = document.querySelectorAll('.categoria');
    const body = document.body;

    // 2. Crear elemento de audio
    const backgroundAudio = new Audio('sonidos/sonido-peliculas.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3; // Volumen al 30% para no ser molesto
    backgroundAudio.muted = true; // Inicialmente muteado

    // 3. Añadir estilos CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        /* Cursor personalizado para toda la página */
        body {
            cursor: url('imagenes/cursor.cur'), auto;
        }
        
        /* Cursor pointer para elementos interactivos */
        .tarjeta, 
        .filtros button,
        a, 
        button, 
        [onclick], 
        [cursor="pointer"] {
            cursor: url('imagenes/pointer.cur'), pointer !important;
        }
        
        /* Efecto hover para tarjetas */
        .tarjeta {
            transition: all 0.3s ease;
            transform-origin: center;
        }
        
        .tarjeta:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 10;
        }
        
        .filtros button:hover{
            background: #ff0000;
            transform: translateY(-3px);
            box-shadow: 0 7px 15px rgba(230, 36, 41, 0.4);
        }
        
        .filtros button.activo{
            background: #990000;
            box-shadow: 0 0 10px rgba(230, 36, 41, 0.7);
        }
        
        /* Animaciones para tarjetas y categorías */
        .tarjeta, .categoria {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // 4. Función para mostrar/ocultar elementos con animación
    function toggleElementos(elementos, mostrar) {
        elementos.forEach(el => {
            if (mostrar) {
                el.style.display = 'block';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 10);
            } else {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.display = 'none';
                }, 300);
            }
        });
    }

    // 5. Función de filtrado mejorada
    function filtrarTarjetas(tipo) {
        // Ocultar todas las tarjetas primero
        toggleElementos(todasTarjetas, false);
        
        // Mostrar las tarjetas del tipo seleccionado después de un breve retraso
        setTimeout(() => {
            const tarjetasAMostrar = tipo === 'todas' 
                ? todasTarjetas 
                : document.querySelectorAll(`.tarjeta.${tipo}`);
            
            toggleElementos(tarjetasAMostrar, true);

            // Manejar visibilidad de categorías
            todasCategorias.forEach(categoria => {
                const titulo = categoria.querySelector('h2, h3');
                const tarjetas = categoria.querySelectorAll('.tarjeta');
                
                const algunaVisible = Array.from(tarjetas).some(
                    tarjeta => getComputedStyle(tarjeta).display !== 'none'
                );
                
                if (algunaVisible) {
                    categoria.style.display = 'block';
                    titulo.style.display = 'block';
                    setTimeout(() => {
                        categoria.style.opacity = '1';
                        titulo.style.opacity = '1';
                    }, 10);
                } else {
                    categoria.style.opacity = '0';
                    titulo.style.opacity = '0';
                    setTimeout(() => {
                        categoria.style.display = 'none';
                        titulo.style.display = 'none';
                    }, 300);
                }
            });
        }, 300);
    }

    // 6. Control de audio modificado
    function setupAudio() {
        // Control de mute
        muteBtn.addEventListener('click', function() {
            // Si está muteado, intentar reproducir al hacer clic
            if (backgroundAudio.muted) {
                backgroundAudio.play().catch(e => console.log("Error al reproducir:", e));
            }
            
            // Cambiar estado de mute
            backgroundAudio.muted = !backgroundAudio.muted;
            this.classList.toggle('activo');
            this.textContent = backgroundAudio.muted ? '🔇' : '🔊';
            
            // Efecto hover al hacer clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        // Actualizar icono inicial
        muteBtn.textContent = backgroundAudio.muted ? '🔇' : '🔊';
    }

    // 7. Event listeners para filtros
    btnPeliculas.addEventListener('click', () => {
        resetearBotones();
        btnPeliculas.classList.add('activo');
        filtrarTarjetas('pelicula');
    });
    
    btnSeries.addEventListener('click', () => {
        resetearBotones();
        btnSeries.classList.add('activo');
        filtrarTarjetas('serie');
    });
    
    btnXmen.addEventListener('click', () => {
        resetearBotones();
        btnXmen.classList.add('activo');
        filtrarTarjetas('xmen');
    });
    
    btnSony.addEventListener('click', () => {
        resetearBotones();
        btnSony.classList.add('activo');
        filtrarTarjetas('sony');
    });
    
    btnOtro.addEventListener('click', () => {
        resetearBotones();
        btnOtro.classList.add('activo');
        filtrarTarjetas('otro');
    });
    
    btnTodas.addEventListener('click', () => {
        resetearBotones();
        btnTodas.classList.add('activo');
        filtrarTarjetas('todas');
    });

    // 8. Función para resetear botones
    function resetearBotones() {
        [btnPeliculas, btnSeries, btnXmen, btnSony, btnOtro, btnTodas].forEach(btn => {
            btn.classList.remove('activo');
        });
    }

    // 9. Inicialización
    setupAudio();
    filtrarTarjetas('pelicula');
});