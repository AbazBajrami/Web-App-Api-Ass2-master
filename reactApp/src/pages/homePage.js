import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToDislikedIcon from '../components/cardIcons/addToDisliked'


const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 
  //DISLIKED
  const dislikedMovies = movies.filter(md => md.dislike)
  localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies))
  const AddToDisliked = (movieId) => true 



  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <>
        <AddToFavoritesIcon movie={movie} /> 
        <AddToDislikedIcon movie={movie} />
        </>
      }}
    />
);
};



export default HomePage;