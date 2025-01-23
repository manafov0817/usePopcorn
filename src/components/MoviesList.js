export default function MoviesList({ children, setSelectedId }) {
    return (
        <ul className="list list-movies">
            {children}
        </ul>
    );
}