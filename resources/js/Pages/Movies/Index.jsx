export default function Index({ movies }) {
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <img src={movie.poster} />
        </div>
      ))}
    </div>
  );
}