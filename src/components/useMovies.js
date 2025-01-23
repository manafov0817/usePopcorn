import { useEffect, useState } from "react";

const key = 'd1c45b16';

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(function () {

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');
                const url = `http://www.omdbapi.com/?apikey=${key}&s=${query}`;

                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error('Network response was not ok');

                const data = await res.json();
                if (data.Response === "False") throw new Error(data.Error);
                setMovies(data.Search);
                setError("");
            }
            catch (error) {
                if (error.name !== 'AbortError')
                    setError(error.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3)
            return;

        // callback?.();

        // handleCloseMove();
        setMovies([]);
        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query])

    return { movies, isLoading, error };
}