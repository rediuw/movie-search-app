import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners"; 
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=f623a9ca&i=${id}`);
      const data = await response.json();
      setLoading(false);

      if (data.Response === "True") {
        setMovie(data);
        setError('');
      } else {
        setMovie(null);
        setError('Movie not found.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  {loading &&<ClipLoader color="blue" size={50} /> }
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return movie ? (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title}style={{ width: '300px', height: 'auto' }} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>

       

    </div>
  ) : null;
}

export default MovieDetails;
