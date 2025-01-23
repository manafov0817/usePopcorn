import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import StarRating from "./StartRating";
import { useKey } from "./useKey";
import { useMovieDetails } from "./useMovieDetails";


export function MovieDetails({ selectedId, selectedMovie, onCloseMovie, onAddWatched }) {
    const [userRating, setUserRating] = useState(0);
    const { movie, isLoading } = useMovieDetails(selectedId);
    useKey(onCloseMovie, 'Escape');

    useEffect(function () {
        if (movie)
            document.title = `Movie | ${movie.Title}`;

        return function () {
            document.title = 'usePopcorn';
        }

    }, [movie]);

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