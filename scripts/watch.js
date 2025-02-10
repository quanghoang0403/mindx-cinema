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
    "iframe"
  ).src = `https://www.2embed.cc/embed/${data.id}`;
  document.querySelector("#movie-title").innerText = data.title || data.name;
  document.querySelector("#movie-description").innerText = data.overview;

  if (data.release_date) {
    document.querySelector(
      "#release-date"
    ).innerText = `Release Date: ${data.release_date}`;
  }
}

function displaySimilarMovies(data) {
  if (data.results.length > 0) {
    document.querySelector("#similar").innerHTML = `
      <h1>Similar Movies</h1>
      <div class="row gy-3">
        ${data.results
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
              </div>`
          )
          .join("")}
      </div>`;
  }
}

function loadMovieInfo() {
  fetchMovieData("", displayMovieDetails);
  fetchMovieData("/similar", displaySimilarMovies);
}

loadMovieInfo();
