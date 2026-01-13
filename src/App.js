import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt15398776",
    Title: "Sasaki To Miyano",
    Year: "2022",
    Poster:
      "https://i.pinimg.com/736x/bb/58/f5/bb58f57fd5413085319f25c02c00b5fc.jpg",
  },
  {
    imdbID: "tt1517268",
    Title: "Go For It, Nakamura!",
    Year: "2026",
    Poster:
      "https://i.pinimg.com/736x/9c/cb/20/9ccb2042976c0dd1656b74ff193603c9.jpg",
  },
  {
    imdbID: "tt8589698",
    Title: "Love Love Campus",
    Year: "2019",
    Poster:
      "https://media.themoviedb.org/t/p/w500/l9DE0mJEadqkVTIlBIyMqVpmAAw.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt15398776",
    Title: "Yes, No, or Maybe?",
    Year: "2020",
    Poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTY1Am4XYhD-ZnBMrhkkTdMht_cbtN7FYRugbN3NQM_zN-kUZz0",
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt1517268",
    Title: "The Stranger by The Beach",
    Year: "2020",
    Poster:
      "https://i.pinimg.com/736x/e2/52/c1/e252c13feb428c6a73e5efaf77133242.jpg",
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function WachedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🎬</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedItem key={index} movie={movie} />
      ))}
    </ul>
  );
}

function BoxMovies({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <BoxMovies element={<MovieList movies={movies} />} />
        <BoxMovies
          element={
            <>
              <WachedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        />
      </Main>
    </>
  );
}
