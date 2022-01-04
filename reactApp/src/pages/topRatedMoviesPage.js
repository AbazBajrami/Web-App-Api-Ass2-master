import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToDislikedIcon from '../components/cardIcons/addToDisliked'
import { getTopRated } from "../api/tmdb-api";




const TopRatedMoviesPage = () => {
    const {  data, error, isLoading, isError }  = useQuery('top', getTopRated)
    if (isLoading) {
        return <Spinner />
      }
      if (isError) {
        return <h1>{error.message}</h1>
      }  
      const movies = data.results;   
      return (
        <PageTemplate
          title="Top Rated Movies"
          movies={movies}
          action={(movie) => {
            return (
              <>
               <AddToFavoritesIcon movie={movie} /> 
            <AddToDislikedIcon movie={movie} />
              </>

            );
          }}
          />
        
      );
};





export default TopRatedMoviesPage;