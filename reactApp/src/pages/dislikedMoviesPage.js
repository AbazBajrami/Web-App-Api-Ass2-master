import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromDisliked from "../components/cardIcons/removeFromDisliked";
import WriteReview from "../components/cardIcons/writeReview";

const DislikedMoviesPage = () => {
  const {dislikedMovies: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const dislikedMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = dislikedMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = dislikedMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Disliked Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromDisliked movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default DislikedMoviesPage;
