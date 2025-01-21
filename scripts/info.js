const searchQuery = new URLSearchParams(location.search);
const movieId = searchQuery.get("id");

if (!movieId) location.href = "./index.html";

const labels = ["data", "casts", "similar"];

async function fetchData() {
  const result = (
    await Promise.all([
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
        )
      ).json(),
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
        )
      ).json(),
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
        )
      ).json(),
    ])
  ).reduce((final, current, index) => {
    if (labels[index] === "data") {
      final[labels[index]] = current;
    } else if (labels[index] === "casts") {
      final[labels[index]] = current.cast
        .filter((item) => item.name && item.character && item.profile_path)
        .slice(0, 10);
    } else if (labels[index] === "similar") {
      final[labels[index]] = current.results;
    }

    return final;
  }, {});

  document.querySelector(
    ".background-img"
  ).style.backgroundImage = `url('https://image.tmdb.org/t/p/original${result.data.backdrop_path}')`;
  document.querySelector(
    "#preview-img"
  ).src = `https://image.tmdb.org/t/p/w300${result.data.poster_path}`;
  document.querySelector("#movie-title").innerText =
    result.data.title || result.data.name;
  document.querySelector("#movie-description").innerText = result.data.overview;
  document.querySelector(
    "#watch-now-btn"
  ).href = `./watch.html?id=${result.data.id}`;

  if (result.data.release_date)
    document.querySelector(
      "#release-date"
    ).innerText = `Release Date: ${result.data.release_date}`;

  if (result.data.genres)
    document.querySelector("#genres").innerHTML = result.data.genres
      .map((genres) => `<span>${genres.name}</span>`)
      .join("");

  if (result.casts) {
    document.querySelector(".casts-grid").innerHTML = result.casts
      .map(
        (item) => `
                            <div>
                                <img src="https://image.tmdb.org/t/p/w200${item.profile_path}" alt="">
                                <p>${item.name}</p>
                                <p class="text-warning">${item.character}</p>
                            </div>
                        `
      )
      .join("");
  }

  if (result.similar && result.similar.length > 0) {
    document.querySelector("#similar").innerHTML = result.similar
      .map(
        (item) => `
                            <div class="col-6 col-md-4 col-lg-2">
                                <a href="./info.html?id=${
                                  item.id
                                }" class="text-decoration-none text-light">
                                    <img src="https://image.tmdb.org/t/p/w200${
                                      item.poster_path
                                    }" class="img-fluid rounded">
                                    <p class="mt-2">${
                                      item.title || item.name
                                    }</p>
                                </a>
                            </div>
                        `
      )
      .join("");
  }
}

fetchData();
