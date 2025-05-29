document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración inicial
    const muteBtn = document.getElementById('mute-btn-secundario');
    const backgroundAudio = new Audio('sonidos/sonido-comics.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.2;
    backgroundAudio.muted = true;

    // 2. Video de fondo
    const bgVideo = document.getElementById('bg-video');
    
    // 3. Galería de cómics destacados
    const comics = document.querySelectorAll('.comic-destacado');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.comic-indicators');
    let currentComicIndex = 0;
    
    // 4. Cursor personalizado
    const style = document.createElement('style');
    style.textContent = `
        body {
            cursor: url('imagenes/cursor.cur'), auto;
        }
        
        .personaje-card, 
        .nav-btn,
        .indicator,
        #mute-btn-secundario,
        .btn-comprar {
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

    // 6. Galería de cómics
    function setupComicGallery() {
        // Crear indicadores
        comics.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToComic(index));
            indicatorsContainer.appendChild(indicator);
        });

        // Botones de navegación
        prevBtn.addEventListener('click', () => {
            goToComic((currentComicIndex - 1 + comics.length) % comics.length);
        });

        nextBtn.addEventListener('click', () => {
            goToComic((currentComicIndex + 1) % comics.length);
        });

        // Autoplay
        setInterval(() => {
            goToComic((currentComicIndex + 1) % comics.length);
        }, 8000);

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToComic((currentComicIndex - 1 + comics.length) % comics.length);
            } else if (e.key === 'ArrowRight') {
                goToComic((currentComicIndex + 1) % comics.length);
            }
        });
    }

    function goToComic(index) {
        comics[currentComicIndex].classList.remove('active');
        document.querySelectorAll('.indicator')[currentComicIndex].classList.remove('active');
        
        currentComicIndex = index;
        
        comics[currentComicIndex].classList.add('active');
        document.querySelectorAll('.indicator')[currentComicIndex].classList.add('active');
    }

    // 7. Cargar personajes destacados
    function cargarPersonajes() {
        const personajes = [
            {
                id: "spiderman",
                nombre: "Spider-Man",
                imagen: "imagenes/comics/spiderman.png",
                comics: [
                    "Amazing Fantasy #15 (1962)",
                    "The Amazing Spider-Man #121-122 (Muerte de Gwen Stacy)",
                    "Spider-Man: Blue",
                    "Kraven's Last Hunt",
                    "Spider-Verse"
                ]
            },
            {
                id: "ironman",
                nombre: "Iron Man",
                imagen: "imagenes/comics/ironman.png",
                comics: [
                    "Tales of Suspense #39 (Primera aparición)",
                    "Demon in a Bottle",
                    "Extremis",
                    "Iron Man: Director of S.H.I.E.L.D.",
                    "Invincible Iron Man (2008)"
                ]
            },
            {
                id: "capitanamerica",
                nombre: "Capitán América",
                imagen: "imagenes/comics/cap.png",
                comics: [
                    "Captain America Comics #1 (1941)",
                    "Captain America #117 (Regreso en los 60s)",
                    "The Winter Soldier",
                    "Civil War",
                    "Captain America: Reborn"
                ]
            },
            {
                id: "thor",
                nombre: "Thor",
                imagen: "imagenes/comics/thor.png",
                comics: [
                    "Journey into Mystery #83 (1962)",
                    "Thor: God of Thunder (2012)",
                    "The Mighty Thor: The Death of Odin",
                    "Ragnarok",
                    "Thor (2007) por J. Michael Straczynski"
                ]
            },
            {
                id: "hulk",
                nombre: "Hulk",
                imagen: "imagenes/comics/hulk.png",
                comics: [
                    "The Incredible Hulk #1 (1962)",
                    "Planet Hulk",
                    "World War Hulk",
                    "Immortal Hulk",
                    "Hulk: Gray"
                ]
            },
            {
                id: "blackwidow",
                nombre: "Black Widow",
                imagen: "imagenes/comics/widow.png",
                comics: [
                    "Tales of Suspense #52 (Primera aparición)",
                    "Black Widow (2010) por Marjorie Liu",
                    "Black Widow (2014) por Nathan Edmondson",
                    "Black Widow (2016) por Mark Waid",
                    "Black Widow (2020) por Kelly Thompson"
                ]
            },
            {
                id: "doctorstrange",
                nombre: "Doctor Strange",
                imagen: "imagenes/comics/strange.png",
                comics: [
                    "Strange Tales #110 (1963)",
                    "The Oath",
                    "Doctor Strange (2015) por Jason Aaron",
                    "Doctor Strange: Damnation",
                    "Doctor Strange (2018) por Mark Waid"
                ]
            },
            {
                id: "wolverine",
                nombre: "Wolverine",
                imagen: "imagenes/comics/wolverine.png",
                comics: [
                    "Incredible Hulk #180-181 (Primera aparición)",
                    "Wolverine (1982 miniserie)",
                    "Old Man Logan",
                    "Wolverine: Origin",
                    "Death of Wolverine"
                ]
            },
            {
                id: "deadpool",
                nombre: "Deadpool",
                imagen: "imagenes/comics/deadpool.png",
                comics: [
                    "The New Mutants #98 (Primera aparición)",
                    "Deadpool (1997) por Joe Kelly",
                    "Deadpool Kills the Marvel Universe",
                    "Deadpool (2012) por Brian Posehn",
                    "Deadpool & Cable"
                ]
            },
            {
                id: "blackpanther",
                nombre: "Black Panther",
                imagen: "imagenes/comics/blackpanther.png",
                comics: [
                    "Fantastic Four #52 (1966)",
                    "Black Panther (1998) por Christopher Priest",
                    "Black Panther (2005) por Reginald Hudlin",
                    "Black Panther (2016) por Ta-Nehisi Coates",
                    "A Nation Under Our Feet"
                ]
            },
            {
                id: "captainmarvel",
                nombre: "Capitana Marvel",
                imagen: "imagenes/comics/capitanamarvel.png",
                comics: [
                    "Marvel Super-Heroes #13 (Primera aparición como Ms. Marvel)",
                    "Ms. Marvel (2006) por Brian Reed",
                    "Captain Marvel (2012) por Kelly Sue DeConnick",
                    "The Life of Captain Marvel",
                    "Captain Marvel (2019) por Kelly Thompson"
                ]
            },
            {
                id: "scarletwitch",
                nombre: "Scarlet Witch",
                imagen: "imagenes/comics/scarlet.png",
                comics: [
                    "X-Men #4 (1964)",
                    "Avengers Disassembled",
                    "House of M",
                    "The Vision and the Scarlet Witch",
                    "Scarlet Witch (2015) por James Robinson"
                ]
            },
            {
                id: "vision",
                nombre: "Vision",
                imagen: "imagenes/comics/vision.png",
                comics: [
                    "Avengers #57 (1968)",
                    "The Vision and the Scarlet Witch",
                    "Avengers A.I.",
                    "Vision (2015) por Tom King",
                    "The Vision (2020) por Julia Hart"
                ]
            },
            {
                id: "loki",
                nombre: "Loki",
                imagen: "imagenes/comics/loki.png",
                comics: [
                    "Venus #6 (1949)",
                    "Journey into Mystery #85 (1962 como villano)",
                    "Loki: Agent of Asgard",
                    "Loki (2019) por Daniel Kibblesmith",
                    "Vote Loki"
                ]
            },
            {
                id: "thanos",
                nombre: "Thanos",
                imagen: "imagenes/comics/thanos.png",
                comics: [
                    "Iron Man #55 (1973)",
                    "The Thanos Quest",
                    "Infinity Gauntlet",
                    "Thanos (2016) por Jeff Lemire",
                    "Thanos Wins"
                ]
            },
            {
                id: "magneto",
                nombre: "Magneto",
                imagen: "imagenes/comics/magneto.png",
                comics: [
                    "X-Men #1 (1963)",
                    "Magneto: Testament",
                    "Magneto (2014) por Cullen Bunn",
                    "House of M",
                    "X-Men: God Loves, Man Kills"
                ]
            },
            {
                id: "storm",
                nombre: "Storm",
                imagen: "imagenes/comics/storm.png",
                comics: [
                    "Giant-Size X-Men #1 (1975)",
                    "Storm (2014) por Greg Pak",
                    "X-Men: Lifedeath",
                    "Uncanny X-Men #201 (Mohawk Storm)",
                    "X-Men: Worlds Apart"
                ]
            },
            {
                id: "jeangrey",
                nombre: "Jean Grey",
                imagen: "imagenes/comics/jean.png",
                comics: [
                    "X-Men #1 (1963)",
                    "The Dark Phoenix Saga",
                    "X-Factor #1 (1986)",
                    "Phoenix: Endsong",
                    "X-Men: Red"
                ]
            },
            {
                id: "daredevil",
                nombre: "Daredevil",
                imagen: "imagenes/comics/daredevil.png",
                comics: [
                    "Daredevil #1 (1964)",
                    "Daredevil: Born Again",
                    "Daredevil: The Man Without Fear",
                    "Daredevil (1998) por Kevin Smith",
                    "Daredevil (2011) por Mark Waid"
                ]
            },
            {
                id: "punisher",
                nombre: "The Punisher",
                imagen: "imagenes/comics/punisher.png",
                comics: [
                    "Amazing Spider-Man #129 (1974)",
                    "Punisher (1986) por Steven Grant",
                    "Punisher MAX (2004) por Garth Ennis",
                    "Welcome Back, Frank",
                    "Punisher: War Zone"
                ]
            }
        ];

        const container = document.getElementById('personajes-container');
        
        personajes.forEach(personaje => {
            const card = document.createElement('div');
            card.className = 'personaje-card';
            card.innerHTML = `
                <img src="${personaje.imagen}" alt="${personaje.nombre}" class="personaje-imagen">
                <div class="personaje-info">
                    <h3>${personaje.nombre}</h3>
                    <div class="comics-destacados">
                        <h4>Mejores cómics:</h4>
                        <ul class="comics-lista">
                            ${personaje.comics.map(comic => `<li>${comic}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // 8. Inicialización
    function init() {
        setupAudio();
        setupComicGallery();
        cargarPersonajes();
        
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
        
        gsap.from(".galeria-comics", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        
        gsap.from(".personajes-grid", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: "power3.out"
        });
    }

    init();
});