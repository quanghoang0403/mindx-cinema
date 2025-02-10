const HomeAPIRoutes = {
  "Trending Movies": "/trending/movie/week",
  "Popular Movies": "/movie/popular",
  "Top Rated Movies": "/movie/top_rated",
  "Now Playing at Theatres": "/movie/now_playing",
  "Upcoming Movies": "/movie/upcoming",
};

const API_KEY = "9b7c3ede447b14c5e0e9d33a137ddac9";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchMovies(section, url) {
  fetch(`${BASE_URL}${url}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(section, data.results);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMovies(section, movies) {
  const moviesContainer = document.getElementById("movies-container");

  // Tạo tiêu đề cho từng danh mục phim
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = section;
  sectionTitle.classList.add("section-title");
  moviesContainer.appendChild(sectionTitle);

  // Tạo khối chứa danh sách phim
  const row = document.createElement("div");
  row.classList.add("row", "gx-3", "gy-3");

  // Duyệt qua danh sách phim và hiển thị từng phim
  movies.forEach((movie) => {
    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4");

    const movieLink = document.createElement("a");
    movieLink.href = `./info.html?id=${movie.id}`;
    movieLink.classList.add("text-decoration-none", "text-light");

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const movieImg = document.createElement("img");
    movieImg.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    movieImg.alt = movie.title;

    const movieTitle = document.createElement("p");
    movieTitle.textContent = movie.title;

    movieCard.appendChild(movieImg);
    movieCard.appendChild(movieTitle);
    movieLink.appendChild(movieCard);
    col.appendChild(movieLink);
    row.appendChild(col);
  });

  moviesContainer.appendChild(row);
}

function loadAllMovies() {
  for (let section in HomeAPIRoutes) {
    fetchMovies(section, HomeAPIRoutes[section]);
  }
}

// Chạy hàm khi trang được tải
loadAllMovies();
