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
      if (!data || data.success === false) {
        console.error("Invalid movie data:", data);
        return;
      }

      // Hiển thị tiêu đề và mô tả phim
      document.querySelector("#movie-title").innerText =
        data.title || data.original_title || "No title available";
      document.querySelector("#movie-description").innerText =
        data.overview || "No description available";
      document.querySelector(
        "#watch-now-btn"
      ).href = `./watch.html?id=${data.id}`;

      // Hiển thị ảnh nền nếu có
      if (data.backdrop_path) {
        document.querySelector(
          ".background-img"
        ).style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`;
      }

      // Hiển thị poster phim nếu có
      if (data.poster_path) {
        document.querySelector(
          "#preview-img"
        ).src = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

loadMovieInfo();
