import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import { ErrorMessage } from "./components/ErrorMessage";
import { Loader } from "./components/Loader";
import Movie from "./components/Movie";
import { MovieDetails } from "./components/MovieDetails";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";


export default function App() {
  const [query, setQuery] = useState('');

  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectedId(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
    setSelectedMovie(() => watched.find(movie => movie.imdbId === id));
  }

  function handleCloseMove() {
    setSelectedId(null);
    document.title = 'Movie';
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbId !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults length={movies.length} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {!isLoading && !error &&
            <MoviesList  >
              {
                movies.map((movie) => <Movie setSelectedId={handleSelectedId} key={movie.imdbID} movie={movie} />)
              }
            </MoviesList>}
        </Box>
        <Box>
          {
            selectedId ?
              <MovieDetails
                onAddWatched={handleAddWatched}
                onCloseMovie={handleCloseMove}
                selectedId={selectedId}
                selectedMovie={selectedMovie} />
              :
              <>
                <WatchedSummary watched={watched} />
                <WatchedList watched={watched} onDelete={handleDeleteWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}

