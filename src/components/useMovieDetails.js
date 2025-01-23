import { useEffect, useState } from "react";

const key = 'd1c45b16';

export function useMovieDetails(selectedId) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    return { movie, isLoading };
}