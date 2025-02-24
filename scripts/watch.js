const searchParams = new URLSearchParams(location.search);
const movieId = searchParams.get("id");

if (!movieId) {
  location.href = "./index.html";
}

function loadMovieInfo() {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=9b7c3ede447b14c5e0e9d33a137ddac9&append_to_response=similar`
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        "iframe"
      ).src = `https://www.2embed.cc/embed/${data.id}`;
      document.querySelector("#movie-title").innerText =
        data.title || data.name;
      document.querySelector("#movie-description").innerText = data.overview;

      if (data.release_date) {
        document.querySelector(
          "#release-date"
        ).innerText = `Release Date: ${data.release_date}`;
      }

      if (data.similar && data.similar.results.length > 0) {
        document.querySelector("#similar").innerHTML = `
          <h1>Similar Movies</h1>
          <div class="row gy-3">
            ${data.similar.results
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
    })
    .catch((error) => console.error("Error fetching data:", error));
}

loadMovieInfo();
