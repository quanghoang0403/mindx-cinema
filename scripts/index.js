const HomeAPIRoutes = {
  "Trending Movies": { url: "/trending/movie/week" },
  "Popular Movies": { url: "/movie/popular" },
  "Top Rated Movies": { url: "/movie/top_rated" },
  "Now Playing at Theatres": { url: "/movie/now_playing" },
  "Upcoming Movies": { url: "/movie/upcoming" },
};

async function fetchData() {
  const moviesContainer = document.getElementById("movies-container");

  // Fetch all movie sections concurrently
  const results = await Promise.all(
    Object.keys(HomeAPIRoutes).map(async (section) => {
      const response = await fetch(
        `https://api.themoviedb.org/3${HomeAPIRoutes[section].url}?api_key=9b7c3ede447b14c5e0e9d33a137ddac9`
      );
      const data = await response.json();
      return { section, movies: data.results };
    })
  );

  // Render each section
  results.forEach(({ section, movies }) => {
    // Create section title
    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = section;
    sectionTitle.classList.add("section-title");
    moviesContainer.appendChild(sectionTitle);

    // Create row for movies
    const row = document.createElement("div");
    row.classList.add("row", "gx-3", "gy-3");

    // Populate movies in the row
    movies.forEach((movie) => {
      const col = document.createElement("div");
      col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4");

      const movieLink = document.createElement("a");
      movieLink.href = `./info.html?id=${movie.id}`;
      movieLink.classList.add("text-decoration-none", "text-light");

      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const movieImg = document.createElement("img");
      const movieTitle = document.createElement("p");
      movieImg.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      movieImg.alt = movie.title;
      movieTitle.innerHTML = movie.title;

      movieCard.appendChild(movieImg);
      movieCard.appendChild(movieTitle);
      movieLink.appendChild(movieCard);
      col.appendChild(movieLink);
      row.appendChild(col);
    });

    moviesContainer.appendChild(row);
  });
}

// Fetch and display movies on page load
fetchData();
