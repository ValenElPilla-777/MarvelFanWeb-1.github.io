document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración inicial
    const muteBtn = document.getElementById('mute-btn-secundario');
    const backgroundAudio = new Audio('sonidos/sonido-videojuegos.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.2;
    backgroundAudio.muted = true;

    // 2. Video de fondo
    const bgVideo = document.getElementById('bg-video');
    
    // 3. Galería de videos
    const videos = document.querySelectorAll('.video-destacado');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.video-indicators');
    let currentVideoIndex = 0;
    
    // 4. Cursor personalizado
    const style = document.createElement('style');
    style.textContent = `
        body {
            cursor: url('imagenes/cursor.cur'), auto;
        }
        
        .cabecera-categoria, 
        .tarjeta-juego,
        .video-juego,
        .nav-btn,
        .indicator,
        #mute-btn-secundario {
            cursor: url('imagenes/pointer.cur'), pointer !important;
        }
    `;
    document.head.appendChild(style);

    // 5. Control de audio
    function setupAudio() {
        muteBtn.addEventListener('click', function() {
            if (backgroundAudio.muted) {
                backgroundAudio.play().catch(e => console.log("Error al reproducir:", e));
            }
            
            backgroundAudio.muted = !backgroundAudio.muted;
            this.textContent = backgroundAudio.muted ? '🔇' : '🔊';
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        muteBtn.textContent = backgroundAudio.muted ? '🔇' : '🔊';
    }

    // 6. Galería de videos
    function setupVideoGallery() {
        // Crear indicadores
        videos.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToVideo(index));
            indicatorsContainer.appendChild(indicator);
        });

        // Botones de navegación
        prevBtn.addEventListener('click', () => {
            goToVideo((currentVideoIndex - 1 + videos.length) % videos.length);
        });

        nextBtn.addEventListener('click', () => {
            goToVideo((currentVideoIndex + 1) % videos.length);
        });

        // Autoplay
        setInterval(() => {
            goToVideo((currentVideoIndex + 1) % videos.length);
        }, 8000);

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToVideo((currentVideoIndex - 1 + videos.length) % videos.length);
            } else if (e.key === 'ArrowRight') {
                goToVideo((currentVideoIndex + 1) % videos.length);
            }
        });
    }

    function goToVideo(index) {
        videos[currentVideoIndex].classList.remove('active');
        document.querySelectorAll('.indicator')[currentVideoIndex].classList.remove('active');
        
        currentVideoIndex = index;
        
        videos[currentVideoIndex].classList.add('active');
        document.querySelectorAll('.indicator')[currentVideoIndex].classList.add('active');
    }

    // 7. Categorías de juegos - Versión corregida
function toggleCategoria(plataforma) {
    const categoria = document.getElementById(`categoria-${plataforma}`);
    const contenido = categoria.querySelector('.contenido-categoria');
    
    // Cierra todas las categorías primero
    document.querySelectorAll('.contenido-categoria').forEach(item => {
        if (item !== contenido) {
            item.style.display = 'none';
            item.parentElement.classList.remove('activa');
        }
    });
    
    // Alterna la categoría clickeada
    if (contenido.style.display === 'flex' || contenido.style.display === '') {
        contenido.style.display = 'none';
        categoria.classList.remove('activa');
    } else {
        contenido.style.display = 'flex';
        categoria.classList.add('activa');
    }
    
    // Efecto visual
    const cabecera = categoria.querySelector('.cabecera-categoria');
    cabecera.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cabecera.style.transform = 'scale(1)';
    }, 150);
}

// 10. Asignar eventos - Versión corregida
document.querySelectorAll('.cabecera-categoria').forEach(cabecera => {
    cabecera.addEventListener('click', (e) => {
        // Evita que el evento se propague si hay elementos clickeables dentro
        e.stopPropagation();
        const plataforma = cabecera.parentElement.id.split('-')[1];
        toggleCategoria(plataforma);
    });
});

    // 8. Cargar videojuegos
    function cargarVideojuegos() {
        const juegos = {
            pc: [
                // === JUEGOS RECIENTES ===
                {
                    id: "marvel-rivals",
                    titulo: "Marvel Rivals",
                    año: "2025",
                    imagen: "imagenes/videojuegos/marvel-rivals-PC.png",
                    tipo: "Multijugador",
                    rating: "★★★★★",
                    descripcion: "Juego 6v6 multijugador de Marvel",
                    enlace: "https://store.steampowered.com/app/2767030/Marvel_Rivals/"
                },
                {
                    id: "spiderman2",
                    titulo: "Marvel's Spider-Man 2",
                    año: "2025",
                    imagen: "imagenes/videojuegos/marvel-spiderman-2-PC.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    exclusivo: "PS5",
                    descripcion: "Secuela del aclamado juego de Insomniac con Symbiote y Kraven..."
                },
                {
                    id: "marvel-snap",
                    titulo: "Marvel Snap",
                    año: "2023",
                    imagen: "imagenes/videojuegos/marvel-snap-PC.png",
                    tipo: "Multijugador/Estrategia",
                    rating: "★★★★☆",
                    descripcion: "Juego de cartas estrategico de Marvel",
                    enlace: "https://store.steampowered.com/app/1997040/MARVEL_SNAP/"
                },
                {
                    id: "midnight_suns",
                    titulo: "Marvel's Midnight Suns",
                    año: "2022",
                    imagen: "imagenes/videojuegos/marvel-suns-PC.png",
                    tipo: "Estrategia/RPG",
                    rating: "★★★★☆",
                    descripcion: "Juego táctico de Firaxis con Blade, Ghost Rider y los héroes oscuros...",
                    enlace: "https://store.steampowered.com/app/368260/Marvels_Midnight_Suns/"
                },
                {
                    id: "spiderman_remastered",
                    titulo: "Marvel's Spider-Man Remastered",
                    año: "2022",
                    imagen: "imagenes/videojuegos/spiderman-remastered-PC.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    descripcion: "Versión mejorada del clásico de Insomniac ahora en PC con DLSS y raytracing...",
                    enlace: "https://store.steampowered.com/app/1817070/Marvels_SpiderMan_Remastered/"
                },
    
                // === RPG/AVENTURAS ===
                {
                    id: "guardians_galaxy",
                    titulo: "Marvel's Guardians of the Galaxy",
                    año: "2021",
                    imagen: "imagenes/videojuegos/guardianes-PC.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    descripcion: "Juego de Eidos-Montréal con mecánicas de equipo y decisiones...",
                    enlace: "https://store.steampowered.com/app/1088850/Marvels_Guardians_of_the_Galaxy/"
                },
                {
                    id: "avengers",
                    titulo: "Marvel's Avengers",
                    año: "2020",
                    imagen: "imagenes/videojuegos/avengers-PC.png",
                    tipo: "Acción-RPG",
                    rating: "★★★☆☆",
                    descripcion: "Juego de Crystal Dynamics con campaña de Kamala Khan...",
                    enlace: "https://store.steampowered.com/app/997070/Marvels_Avengers/"
                },
    
                // === CLÁSICOS REMASTERIZADOS ===
                {
                    id: "ultimate_alliance",
                    titulo: "Marvel Ultimate Alliance Remastered",
                    año: "2016",
                    imagen: "imagenes/videojuegos/ultimate-alliance-PC.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    descripcion: "Remaster del clásico de 2006 con +50 personajes jugables...",
                    enlace: "https://store.steampowered.com/app/433300/Marvel_Ultimate_Alliance/"
                },
                {
                    id: "mua2",
                    titulo: "Marvel Ultimate Alliance 2",
                    año: "2016",
                    imagen: "imagenes/videojuegos/ultimate-aliance-PC.png",
                    tipo: "RPG de acción",
                    rating: "★★★☆☆",
                    descripcion: "Secuela basada en el evento Civil War de Marvel...",
                    enlace: "https://store.steampowered.com/app/462780/Marvel_Ultimate_Alliance_2/"
                },
    
                // === JUEGOS DE LUCHA ===
                {
                    id: "mvc_infinite",
                    titulo: "Marvel vs. Capcom: Infinite",
                    año: "2017",
                    imagen: "imagenes/videojuegos/marvel-capcom-PC.png",
                    tipo: "Lucha",
                    rating: "★★★☆☆",
                    descripcion: "Combates 2v2 con personajes de Marvel y Capcom...",
                    enlace: "https://store.steampowered.com/app/493840/Marvel_vs_Capcom_Infinite/"
                },
                {
                    id: "marvel_nemesis",
                    titulo: "Marvel Nemesis: Rise of the Imperfects",
                    año: "2005",
                    imagen: "imagenes/videojuegos/marvel-nemesis-PC.png",
                    tipo: "Lucha",
                    rating: "★★☆☆☆",
                    descripcion: "Juego de lucha con héroes y villanos originales...",
                    enlace: null // No disponible digitalmente
                },
    
                // === LEGO MARVEL ===
                {
                    id: "lego_marvel1",
                    titulo: "LEGO Marvel Super Heroes",
                    año: "2013",
                    imagen: "imagenes/videojuegos/lego1-PC.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★★★",
                    descripcion: "Juego con +100 personajes del universo Marvel...",
                    enlace: "https://store.steampowered.com/app/249130/LEGO_Marvel_Super_Heroes/"
                },
                {
                    id: "lego_marvel2",
                    titulo: "LEGO Marvel Super Heroes 2",
                    año: "2017",
                    imagen: "imagenes/videojuegos/lego2-PC.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★★☆",
                    descripcion: "Secuela con Kang como villano principal...",
                    enlace: "https://store.steampowered.com/app/647830/LEGO_Marvel_Super_Heroes_2/"
                },
    
                // === JUEGOS ANTIGUOS (GOG/Steam) ===
                {
                    id: "spiderman_2000",
                    titulo: "Spider-Man (2000)",
                    año: "2000",
                    imagen: "imagenes/videojuegos/spiderman2000.png",
                    tipo: "Acción-Aventura",
                    rating: "★★★★☆",
                    descripcion: "Clásico de Neversoft con modos de juego únicos...",
                    enlace: "https://www.gog.com/en/game/spiderman_2000"
                },
                {
                    id: "xmen_legends",
                    titulo: "X-Men Legends",
                    año: "2004",
                    imagen: "imagenes/videojuegos/xmenlegends-PC.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    descripcion: "Predecesor de Ultimate Alliance...",
                    enlace: null // Solo físico
                }
            ],
            playstation: [
                // === JUEGOS MODERNOS ===
                {
                    id: "marvel-rivals",
                    titulo: "Marvel Rivals",
                    año: "2025",
                    imagen: "imagenes/videojuegos/marvel-rivals-PC.png",
                    tipo: "Multijugador",
                    rating: "★★★★★",
                    descripcion: "Juego 6v6 multijugador de Marvel",
                },
                {
                    id: "spiderman2",
                    titulo: "Marvel's Spider-Man 2",
                    año: "2023",
                    imagen: "imagenes/videojuegos/marvel-spiderman-2-PS5.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    exclusivo: "PS5",
                    descripcion: "Secuela del aclamado juego de Insomniac con Symbiote y Kraven..."
                },
                {
                    id: "wolverine",
                    titulo: "Marvel's Wolverine",
                    año: "2025",
                    imagen: "imagenes/videojuegos/wolverine-PS5.png",
                    tipo: "Aventura de acción",
                    rating: "???",
                    exclusivo: "PS5",
                    descripcion: "Juego en desarrollo por Insomniac centrado en Lobezno..."
                },
    
                // === ERA PS4/PS5 ===
                {
                    id: "spiderman1",
                    titulo: "Marvel's Spider-Man",
                    año: "2018",
                    imagen: "imagenes/videojuegos/marvel-spiderman-PS5.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    exclusivo: "PS4/PS5",
                    descripcion: "El clásico de Insomniac que revolucionó los juegos de Spider-Man..."
                },
                {
                    id: "milesmorales",
                    titulo: "Spider-Man: Miles Morales",
                    año: "2020",
                    imagen: "imagenes/videojuegos/miles-morales-PS5.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★☆",
                    exclusivo: "PS4/PS5",
                    descripcion: "Aventura independiente del Spider-Man de Harlem..."
                },
                {
                    id: "ironmanvr",
                    titulo: "Iron Man VR",
                    año: "2020",
                    imagen: "imagenes/videojuegos/iromanvr-PS5.png",
                    tipo: "Realidad Virtual",
                    rating: "★★★☆☆",
                    exclusivo: "PSVR",
                    descripcion: "Simulador de vuelo como Iron Man en VR..."
                },
    
                // === ERA PS3 ===
                {
                    id: "spiderman_edge",
                    titulo: "Spider-Man: Edge of Time",
                    año: "2011",
                    imagen: "imagenes/videojuegos/spidermanedgeoftime-PS5.png",
                    tipo: "Acción-Aventura",
                    rating: "★★★☆☆",
                    exclusivo: "PS3",
                    descripcion: "Viaje temporal con Spider-Man 2099..."
                },
                {
                    id: "xmen_destiny",
                    titulo: "X-Men: Destiny",
                    año: "2011",
                    imagen: "imagenes/videojuegos/xmen-destiny-PS3.png",
                    tipo: "RPG de acción",
                    rating: "★★☆☆☆",
                    exclusivo: "PS3",
                    descripcion: "Historia original con mutantes personalizables..."
                },
    
                // === ERA PS2 (CLÁSICOS) ===
                {
                    id: "spiderman2_ps2",
                    titulo: "Spider-Man 2",
                    año: "2004",
                    imagen: "imagenes/videojuegos/spiderman2-PS2.png",
                    tipo: "Acción-Aventura",
                    rating: "★★★★☆",
                    exclusivo: "PS2",
                    descripcion: "El clásico juego del tren de Spider-Man..."
                },
                {
                    id: "xmen_legends",
                    titulo: "X-Men Legends",
                    año: "2004",
                    imagen: "imagenes/videojuegos/xmen-destiny-PS2.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    exclusivo: "PS2",
                    descripcion: "Juego de squad con los X-Men..."
                },
    
                // === ERA PS1 (RETRO) ===
                {
                    id: "spiderman_ps1",
                    titulo: "Spider-Man (2000)",
                    año: "2000",
                    imagen: "imagenes/videojuegos/spiderman-PS1.png",
                    tipo: "Acción en 3D",
                    rating: "★★★★☆",
                    exclusivo: "PS1",
                    descripcion: "Clásico de Neversoft con modo Venom..."
                },
                {
                    id: "xmen_mutant",
                    titulo: "X-Men: Mutant Academy",
                    año: "2000",
                    imagen: "imagenes/videojuegos/xmen-PS1.png",
                    tipo: "Lucha",
                    rating: "★★★☆☆",
                    exclusivo: "PS1",
                    descripcion: "Juego de lucha con los X-Men..."
                }
            ],
            xbox: [
                // === XBOX SERIES X|S ===
                {
                    id: "midnight_suns_xbox",
                    titulo: "Marvel's Midnight Suns",
                    año: "2022",
                    imagen: "imagenes/videojuegos/midnightsuns-XBOX.png",
                    tipo: "Estrategia/RPG",
                    rating: "★★★★☆",
                    exclusivo: "Optimizado X|S",
                    descripcion: "Juego táctico con los héroes oscuros de Marvel, 4K 60fps en Series X."
                },
                {
                    id: "guardians_xbox",
                    titulo: "Marvel's Guardians of the Galaxy",
                    año: "2021",
                    imagen: "imagenes/videojuegos/guardianes-XBOX.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    exclusivo: "Smart Delivery",
                    descripcion: "Aventura de Eidos-Montréal con mejora para Series X/S."
                },
    
                // === XBOX ONE ERA ===
                {
                    id: "avengers_xbox",
                    titulo: "Marvel's Avengers",
                    año: "2020",
                    imagen: "imagenes/videojuegos/marvel-avengers-XBOX.png",
                    tipo: "Acción-RPG",
                    rating: "★★★☆☆",
                    descripcion: "Versión Xbox One con todos los DLCs incluidos."
                },
                {
                    id: "mua3_xbox",
                    titulo: "Marvel Ultimate Alliance 3",
                    año: "2019",
                    imagen: "imagenes/videojuegos/ultimatealliane3-XBOX.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    exclusivo: "Consolas (Switch/Xbox)",
                    descripcion: "Exclusivo de consolas con DLC de X-Men y FF."
                },
    
                // === XBOX 360 (COMPATIBLES) ===
                {
                    id: "deadpool_xbox",
                    titulo: "Deadpool",
                    año: "2013",
                    imagen: "imagenes/videojuegos/deadpool-XBOX.png",
                    tipo: "Acción-Hack n' Slash",
                    rating: "★★★☆☆",
                    descripcion: "Juego del mercenario bocazas, compatible con Xbox One/Series."
                },
                {
                    id: "mvc3_xbox",
                    titulo: "Marvel vs. Capcom 3",
                    año: "2011",
                    imagen: "imagenes/videojuegos/marvel-capcom-XBOX.png",
                    tipo: "Lucha",
                    rating: "★★★★☆",
                    descripcion: "Versión Ultimate con 50 personajes, compatible con nuevas Xbox."
                },
    
                // === CLÁSICOS XBOX ORIGINAL ===
                {
                    id: "xmen_legends_xbox",
                    titulo: "X-Men Legends",
                    año: "2004",
                    imagen: "imagenes/videojuegos/xmen-legends-XBOX.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    descripcion: "Clásico de Raven Software, precursor de Ultimate Alliance."
                },
                {
                    id: "punisher_xbox",
                    titulo: "The Punisher",
                    año: "2005",
                    imagen: "imagenes/videojuegos/punisher-XBOX.png",
                    tipo: "Shooter en 3ra persona",
                    rating: "★★★☆☆",
                    descripcion: "Juego basado en el cómic MAX con interrogaciones brutales."
                },
    
                // === MULTIPLATAFORMA NOTABLES ===
                {
                    id: "lego_avengers_xbox",
                    titulo: "LEGO Marvel's Avengers",
                    año: "2016",
                    imagen: "imagenes/videojuegos/lego-avengers-XBOX.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★★☆",
                    descripcion: "Basado en las películas del UCM con open world."
                },
                {
                    id: "spiderman_web_xbox",
                    titulo: "Spider-Man: Web of Shadows",
                    año: "2008",
                    imagen: "imagenes/videojuegos/spiderman-web-XBOX.png",
                    tipo: "Acción-Aventura",
                    rating: "★★★☆☆",
                    descripcion: "Juego con mecánicas de traje negro/simbiote."
                }
            ],
            nintendo: [
                // === EXCLUSIVOS DE NINTENDO SWITCH ===
                {
                    id: "ultimate_alliance_3",
                    titulo: "Marvel Ultimate Alliance 3: The Black Order",
                    año: "2019",
                    imagen: "imagenes/videojuegos/ultimate-aliance-ND.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    exclusivo: "Switch",
                    descripcion: "Exclusivo de Switch con DLCs de X-Men, Fantastic Four y Marvel Knights.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvel-ultimate-alliance-3-the-black-order-switch/"
                },
            
                // === JUEGOS EN LA NUBE ===
                {
                    id: "guardians_cloud",
                    titulo: "Marvel's Guardians of the Galaxy (Cloud Version)",
                    año: "2021",
                    imagen: "imagenes/videojuegos/guardianes-ND.png",
                    tipo: "Aventura de acción",
                    rating: "★★★★★",
                    exclusivo: "Cloud (Switch)",
                    descripcion: "Versión en la nube del aclamado juego de Eidos-Montréal.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvels-guardians-of-the-galaxy-cloud-version-switch/"
                },
            
                // === JUEGOS FÍSICOS/DIGITALES ===
                {
                    id: "lego_marvel1_switch",
                    titulo: "LEGO Marvel Super Heroes",
                    año: "2013",
                    imagen: "imagenes/videojuegos/lego1-ND.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★★☆",
                    descripcion: "Más de 100 personajes del universo Marvel en mundo abierto.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/lego-marvel-super-heroes-switch/"
                },
                {
                    id: "lego_marvel2_switch",
                    titulo: "LEGO Marvel Super Heroes 2",
                    año: "2017",
                    imagen: "imagenes/videojuegos/lego2-ND.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★★☆",
                    descripcion: "Secuela con Kang el Conquistador y viajes en el tiempo.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/lego-marvel-super-heroes-2-switch/"
                },
                {
                    id: "lego_avengers_switch",
                    titulo: "LEGO Marvel's Avengers",
                    año: "2016",
                    imagen: "imagenes/videojuegos/lego-avengers-ND.png",
                    tipo: "Aventura LEGO",
                    rating: "★★★☆☆",
                    descripcion: "Basado en las películas de Avengers del UCM.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/lego-marvels-avengers-switch/"
                },
                {
                    id: "mvc_infinite_switch",
                    titulo: "Marvel vs. Capcom: Infinite",
                    año: "2017",
                    imagen: "imagenes/videojuegos/marvel-capcom-ND.png",
                    tipo: "Lucha",
                    rating: "★★★☆☆",
                    descripcion: "Combates 2v2 con Infinity Stones.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvel-vs-capcom-infinite-switch/"
                },
            
                // === JUEGOS RETRO/ARCADE ===
                {
                    id: "marvel_ultimate_alliance_1_2",
                    titulo: "Marvel Ultimate Alliance 1 & 2 Bundle",
                    año: "2016",
                    imagen: "imagenes/videojuegos/ultimatealliancebudle-ND.png",
                    tipo: "RPG de acción",
                    rating: "★★★★☆",
                    descripcion: "Pack remasterizado de los clásicos de PS3/Xbox 360.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvel-ultimate-alliance-1-and-2-bundle-switch/"
                },
                {
                    id: "marvel_super_heroes_arcade",
                    titulo: "Marvel Super Heroes (Arcade)",
                    año: "1995",
                    imagen: "imagenes/videojuegos/marvel-superhearos-ND.png",
                    tipo: "Lucha (Arcade Archives)",
                    rating: "★★★★☆",
                    descripcion: "Clásico arcade de Capcom con las Gemas del Infinito.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvel-super-heroes-arcade-archives-switch/"
                },
            
                // === JUEGOS INDIE ===
                {
                    id: "marvel_puzzle_quest",
                    titulo: "Marvel Puzzle Quest",
                    año: "2013",
                    imagen: "imagenes/videojuegos/marvelpuzzlequest-ND.png",
                    tipo: "Puzzle/RPG",
                    rating: "★★★☆☆",
                    descripcion: "Combina fichas con más de 200 personajes Marvel.",
                    enlace: "https://www.nintendo.com/es-mx/store/products/marvel-puzzle-quest-switch/"
                },
                {
                    id: "marvel_dimension_of_heroes",
                    titulo: "Marvel: Dimension of Heroes",
                    año: "2020",
                    imagen: "imagenes/videojuegos/dimensionheroes-ND.png",
                    tipo: "Realidad Virtual",
                    rating: "★★★☆☆",
                    exclusivo: "Switch (Labo VR)",
                    descripcion: "Experiencia VR con los personajes de Marvel."
                }
            ],
            moviles: [
                // === JUEGOS DE ESTRATEGIA ===
                {
                    id: "marvel_snap",
                    titulo: "MARVEL SNAP",
                    año: "2022",
                    imagen: "imagenes/videojuegos/marvel-snap-ML.png",
                    tipo: "Cartas/Estrategia",
                    rating: "★★★★★",
                    descripcion: "Juego de cartas rápido (3 minutos por partida) con 200+ personajes.",
                    enlace: "https://play.google.com/store/apps/details?id=com.nvsgames.snap",
                    plataformas: "iOS/Android"
                },
                {
                    id: "marvel_strike_force",
                    titulo: "MARVEL Strike Force",
                    año: "2018",
                    imagen: "imagenes/videojuegos/strikeforce-ML.png",
                    tipo: "RPG por turnos",
                    rating: "★★★★☆",
                    descripcion: "Forma equipos de 5 personajes (150+ disponibles). Eventos en tiempo real.",
                    enlace: "https://play.google.com/store/apps/details?id=com.foxnextgames.m3",
                    plataformas: "iOS/Android"
                },
            
                // === RPG/ACCIÓN ===
                {
                    id: "marvel_future_fight",
                    titulo: "MARVEL Future Fight",
                    año: "2015",
                    imagen: "imagenes/videojuegos/marvelfuturefight-ML.png",
                    tipo: "RPG de acción",
                    rating: "★★★★★",
                    descripcion: "250+ personajes jugables con gráficos AAA. Modos PvE y PvP.",
                    enlace: "https://play.google.com/store/apps/details?id=com.netmarble.mherosgb",
                    plataformas: "iOS/Android"
                },
                {
                    id: "marvel_revolution",
                    titulo: "MARVEL Revolution",
                    año: "2021",
                    imagen: "imagenes/videojuegos/marvelrevolution-ML.png",
                    tipo: "MMORPG",
                    rating: "★★★☆☆",
                    descripcion: "MMO de mundo abierto con creación de personajes propios.",
                    enlace: "https://play.google.com/store/apps/details?id=com.netmarble.mrevolution",
                    plataformas: "iOS/Android"
                },
            
                // === JUEGOS DE LUCHA ===
                {
                    id: "marvel_contest",
                    titulo: "MARVEL Contest of Champions",
                    año: "2014",
                    imagen: "imagenes/videojuegos/marvelcontestchampions-ML.png",
                    tipo: "Lucha 1v1",
                    rating: "★★★★☆",
                    descripcion: "Sistema de combate estilo Mortal Kombat con 200+ luchadores.",
                    enlace: "https://play.google.com/store/apps/details?id=com.kabam.marvelbattle",
                    plataformas: "iOS/Android"
                },
                {
                    id: "marvel_dimension_of_heroes",
                    titulo: "MARVEL Dimension of Heroes",
                    año: "2020",
                    imagen: "imagenes/videojuegos/marveldimensionofheroes-ML.png",
                    tipo: "Lucha/AR",
                    rating: "★★★☆☆",
                    descripcion: "Combates en Realidad Aumentada con figuras interactivas.",
                    plataformas: "iOS/Android"
                },
            
                // === PUZZLE/AVENTURA ===
                {
                    id: "marvel_puzzle_quest",
                    titulo: "MARVEL Puzzle Quest",
                    año: "2013",
                    imagen: "imagenes/videojuegos/marvelpuzzlequest-ML.png",
                    tipo: "Puzzle/RPG",
                    rating: "★★★★☆",
                    descripcion: "Combina fichas para atacar. 100+ personajes con habilidades únicas.",
                    enlace: "https://play.google.com/store/apps/details?id=com.d3publish.marvelpq_android",
                    plataformas: "iOS/Android"
                },
            
                // === JUEGOS RETIRADOS (AÚN DISPONIBLES) ===
                {
                    id: "marvel_avengers_academy",
                    titulo: "MARVEL Avengers Academy",
                    año: "2016",
                    imagen: "imagenes/videojuegos/marvelavengersacademygame-ML.png",
                    tipo: "Simulador",
                    rating: "★★★☆☆",
                    descripcion: "Construye tu academia de héroes (servidores activos pero sin actualizaciones).",
                    enlace: "https://play.google.com/store/apps/details?id=com.tinyco.marvel",
                    plataformas: "iOS/Android",
                    estado: "Sin soporte"
                },
                {
                    id: "marvel_spider-man_unlimited",
                    titulo: "Spider-Man Unlimited",
                    año: "2014",
                    imagen: "imagenes/videojuegos/spidermanunlimited-ML.png",
                    tipo: "Endless Runner",
                    rating: "★★☆☆☆",
                    descripcion: "Carrera infinita con múltiples trajes de Spider-Man.",
                    plataformas: "iOS/Android",
                    estado: "Servidores activos"
                }
            ]
            
        };

        for (const plataforma in juegos) {
            const contenedor = document.querySelector(`#categoria-${plataforma} .contenido-categoria`);
            
            juegos[plataforma].forEach(juego => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-juego';
                tarjeta.innerHTML = `
                    <img src="${juego.imagen}" alt="${juego.titulo}">
                    <div class="juego-info">
                        <h4>${juego.titulo}</h4>
                        <p><span class="info-label">Año:</span> ${juego.año}</p>
                        <p><span class="info-label">Género:</span> <span class="tipo-juego">${juego.tipo}</span></p>
                        <p><span class="info-label">Rating:</span> <span class="rating">${juego.rating}</span></p>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });
        }
    }

    // 9. Inicialización
    function init() {
        setupAudio();
        setupVideoGallery();
        cargarVideojuegos();
        
        // Animación de entrada
        gsap.from("#barra-superior-peliculas", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from(".titulo-seccion", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "back.out"
        });
        
        gsap.from(".galeria-videos", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
    }

    init();
    
    // 10. Asignar eventos a las categorías
    document.querySelectorAll('.cabecera-categoria').forEach(cabecera => {
        const plataforma = cabecera.parentElement.id.split('-')[1];
        cabecera.addEventListener('click', () => toggleCategoria(plataforma));
    });
});