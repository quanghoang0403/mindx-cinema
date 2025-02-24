function loadMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
  )
    .then((response) => response.json())
    .then((data) => {
      const moviesContainer = document.getElementById("movies-container");
      let htmlContent = `<div class='row gx-3 gy-3'>`;

      data.results.forEach((movie) => {
        htmlContent += `
          <div class="col-6 col-md-4 col-lg-2 mb-4">
            <a href="./info.html?id=${movie.id}" class="text-decoration-none text-light">
              <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <p>${movie.title}</p>
              </div>
            </a>
          </div>`;
      });

      htmlContent += "</div>";
      moviesContainer.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

loadMovies();
