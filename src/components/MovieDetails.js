import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import StarRating from "./StartRating";

const key = 'd1c45b16';

export function MovieDetails({ selectedId, selectedMovie, onCloseMovie, onAddWatched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
     
    useEffect(function () {
        const controller = new AbortController();
        async function fetchMovieDetails() {
            try {
                setIsLoading(true);
                const url = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;
                const res = await fetch(url, { signal: controller.signal });

                if (!res.ok) throw new Error('Network response was not ok');

                const data = await res.json();
                if (data.Response === "False") throw new Error(data.Error);

                setMovie(data);
            } catch (error) {
                if (error.name !== 'AbortError')
                    console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchMovieDetails();

        return function () {
            controller.abort();
        }
    }, [selectedId])

    useEffect(function () {
        if (movie)
            document.title = `Movie | ${movie.Title}`;

        return function () {
            document.title = 'usePopcorn';
        }

    }, [movie]);


    useEffect(function () {
        function callback(e) {
            if (e.key === 'Escape')
                onCloseMovie();
        }

        document.addEventListener('keydown', callback)

        return function () {
            document.removeEventListener('keydown', callback);
        }
    }, [onCloseMovie])


    function handleAdd() {
        const newWatchMovie = {
            imdbId: selectedId,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            imdbRating: Number(movie.imdbRating),
            runtime: movie.Runtime.split(' ').at(0),
            userRating
        }
        onAddWatched(newWatchMovie);
        onCloseMovie();
    }

    return (
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>🔙</button>
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>{movie.Released} &bull; {movie.Runtime}</p>
                            <p>{movie.Genre}</p>
                            <p>{movie.Rating}</p>
                            <p><span>⭐</span>{movie.imdbRating} IMDb Rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {
                                !selectedMovie ?
                                    <>
                                        <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                                        {userRating > 0 && <button className="btn-add" onClick={handleAdd}>➕ Add To List</button>}
                                    </> : <p>You rated this movie with {selectedMovie.userRating} ⭐</p>
                            }
                        </div>
                        <p><em>{movie.Plot}</em></p>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed By {movie.Director}</p>
                    </section>
                </>
            }
        </div>
    );
}