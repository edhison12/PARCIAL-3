const movies = [
    {
        title: "Deadpool & Wolverine",
        image: "deadpool.webp",
        description: "Un apático Wade Wilson se esfuerza en su vida civil, dejando atrás sus días como el mercenario moralmente flexible, Deadpool.",
        category: "accion"
    },
    {
        title: "Bad Boys: Ride or Die",
        image: "badbo.webp",
        description: "Después de que su difunto ex capitán es incriminado, Lowrey y Burnett intentan limpiar su nombre, pero terminan ellos también prófugos.",
        category: "accion"
    },
    {
        title: "CROW",
        image: "CROW.webp",
        description: "Las almas gemelas Eric y Shelly son brutalmente asesinadas cuando los demonios del oscuro pasado de ella los alcanzan.",
        category: "terror"
    },
    {
        title: "Meg 2: La trinchera",
        image: "megalodon.webp",
        description: "Una inmersión exploratoria en las profundidades más profundas del océano de un audaz equipo de investigación se convierte en caos.",
        category: "sci-fi"
    },
    {
        title: "Alien",
        image: "Alien.webp",
        description: "Mientras hurgan en las profundidades de una estación espacial abandonada, un grupo de jóvenes colonizadores espaciales se encuentran cara a cara con la forma de vida más aterradora del universo.",
        category: "sci-fi"
    },
    {
        title: "Borderlands",
        image: "bonder.webp",
        description: "Al regresar a su planeta natal, una infame cazarrecompensas forma una alianza inesperada con un equipo de héroes improbables.",
        category: "accion"
    },
];

let favorites = []; // Array para almacenar las películas favoritas

const movieGrid = document.getElementById("movie-grid");
const favoritesGrid = document.getElementById("favorites-grid");
const searchBar = document.getElementById("search-bar");
const modal = document.getElementById("movie-modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");

function renderMovies(filteredMovies, grid) {
    grid.innerHTML = ""; // Limpiar la cuadrícula antes de renderizar
    filteredMovies.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <div class="icon-container">
                <span class="watch-icon">&#128065;</span> <!-- Icono de "Ver" -->
                <span class="download-icon">&#128229;</span> <!-- Icono de "Descargar" -->
                <span class="favorite-icon">&#9733;</span> <!-- Icono de "Favoritos" -->
            </div>
        `;

        movieItem.addEventListener("click", () => openModal(movie));

        const watchIcon = movieItem.querySelector(".watch-icon");
        const downloadIcon = movieItem.querySelector(".download-icon");
        const favoriteIcon = movieItem.querySelector(".favorite-icon");

        watchIcon.addEventListener("click", (event) => {
            event.stopPropagation();
            alert(`Ver ${movie.title}`);
        });

        downloadIcon.addEventListener("click", (event) => {
            event.stopPropagation();
            alert(`Descargar ${movie.title}`);
        });

        favoriteIcon.addEventListener("click", (event) => {
            event.stopPropagation();
            addToFavorites(movie);
        });

        grid.appendChild(movieItem);
    });
}

function addToFavorites(movie) {
    if (!favorites.includes(movie)) {
        if (favorites.length < 6) { // Limitar a 6 favoritos
            favorites.push(movie);
        } else {
            alert("Solo puedes agregar hasta 6 películas favoritas.");
        }
    } else {
        alert("Esta película ya está en tus favoritos.");
    }
    renderFavorites(); // Renderizar la sección de favoritos
}

function renderFavorites() {
    renderMovies(favorites, favoritesGrid); // Renderizar favoritos
}

function openModal(movie) {
    modal.style.display = "block";
    modalTitle.innerText = movie.title;
    modalImage.src = movie.image;
    modalDescription.innerText = movie.description;
    modal.classList.add("fade-in");
}

function closeModalFunction() {
    modal.classList.remove("fade-in");
    modal.style.display = "none";
}

closeModal.onclick = closeModalFunction;

window.onclick = function(event) {
    if (event.target === modal) {
        closeModalFunction();
    }
};

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModalFunction();
    }
});

searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchText) ||
        movie.description.toLowerCase().includes(searchText)
    );
    renderMovies(filteredMovies, movieGrid);
});

// Filtrar por categorías
const categoryButtons = document.querySelectorAll('.category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.getAttribute('data-category');
        const filteredMovies = selectedCategory === "todos" ? movies : movies.filter(movie => movie.category === selectedCategory);
        renderMovies(filteredMovies, movieGrid);
    });
});

renderMovies(movies, movieGrid); // Renderizar todas las películas al inicio
renderFavorites(); // Inicializar la sección de favoritos
