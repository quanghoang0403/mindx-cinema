const searchQuery = new URLSearchParams(location.search);
const movieId = searchQuery.get("id");

if (!movieId) location.href = "./index.html";

(async () => {
  const result = (
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
      ).then((res) => res.json()),
    ])
  ).reduce((final, current, index) => {
    if (index === 0) {
      final.data = current;
    } else if (index === 1) {
      final.similar = current.results;
    }
    return final;
  }, {});

  document.querySelector(
    "iframe"
  ).src = `https://www.2embed.cc/embed/${result.data.id}`;
  document.querySelector("#movie-title").innerText =
    result.data.title || result.data.name;
  document.querySelector("#movie-description").innerText = result.data.overview;

  if (result.data.release_date)
    document.querySelector(
      "#release-date"
    ).innerText = `Release Date: ${result.data.release_date}`;

  if (result.similar && result.similar.length > 0)
    document.querySelector("#similar").innerHTML = `
      <h1>Similar Movies</h1>
      <div class="row gy-3">
        ${result.similar
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
      </div>
    `;
})();
