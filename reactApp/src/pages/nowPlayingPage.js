import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToDislikedIcon from '../components/cardIcons/addToDisliked'
import { getNowPlayingMovies } from "../api/tmdb-api";




const NowPlayingMoviesPage = () => {
    const {  data, error, isLoading, isError }  = useQuery('Now Playing', getNowPlayingMovies)
    if (isLoading) {
        return <Spinner />
      }
      if (isError) {
        return <h1>{error.message}</h1>
      }  
      const movies = data.results;   
      return (
        <PageTemplate
          title="Now Playing Movies"
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


export default NowPlayingMoviesPage;