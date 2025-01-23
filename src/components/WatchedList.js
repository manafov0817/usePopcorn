import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, onDelete }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbId} onDelete={onDelete} />
            ))}
        </ul>
    );
}
