const searchParams = new URLSearchParams(location.search);
const movieId = searchParams.get("id");

if (!movieId) {
  location.href = "./index.html";
}

const API_KEY = "9b7c3ede447b14c5e0e9d33a137ddac9";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchMovieData(endpoint, callback) {
  fetch(`${BASE_URL}/movie/${movieId}${endpoint}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMovieDetails(data) {
  document.querySelector(
    ".background-img"
  ).style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`;
  document.querySelector(
    "#preview-img"
  ).src = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
  document.querySelector("#movie-title").innerText = data.title || data.name;
  document.querySelector("#movie-description").innerText = data.overview;
  document.querySelector("#watch-now-btn").href = `./watch.html?id=${data.id}`;

  if (data.release_date) {
    document.querySelector(
      "#release-date"
    ).innerText = `Release Date: ${data.release_date}`;
  }

  if (data.genres) {
    document.querySelector("#genres").innerHTML = data.genres
      .map((genre) => `<span>${genre.name}</span>`)
      .join(" ");
  }
}

function displayCasts(data) {
  const castList = data.cast
    .filter((item) => item.name && item.character && item.profile_path)
    .slice(0, 10);
  document.querySelector(".casts-grid").innerHTML = castList
    .map(
      (item) => `
      <div>
        <img src="https://image.tmdb.org/t/p/w200${item.profile_path}" alt="">
        <p>${item.name}</p>
        <p class="text-warning">${item.character}</p>
      </div>
    `
    )
    .join(" ");
}

function displaySimilarMovies(data) {
  if (data.results.length > 0) {
    document.querySelector("#similar").innerHTML = data.results
      .map(
        (item) => `
        <div class="col-6 col-md-4 col-lg-2">
          <a href="./info.html?id=${
            item.id
          }" class="text-decoration-none text-light">
            <img src="https://image.tmdb.org/t/p/w200${
              item.poster_path
            }" class="img-fluid rounded">
            <p class="mt-2">${item.title || item.name}</p>
          </a>
        </div>
      `
      )
      .join(" ");
  }
}

function loadMovieInfo() {
  fetchMovieData("", displayMovieDetails);
  fetchMovieData("/credits", displayCasts);
  fetchMovieData("/similar", displaySimilarMovies);
}

loadMovieInfo();
