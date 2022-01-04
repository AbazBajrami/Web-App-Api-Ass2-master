import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToDislikedIcon from '../components/cardIcons/addToDisliked'
import { getPopularMovies } from "../api/tmdb-api";
//import Pagination from "@material-ui/lab/Pagination";
//import SiteHeader from "../components/siteHeader";



const PopularMoviesPage = () => {
    //const [page, setPage] = React.useState(1);
    // const handleChange = (event, value) => setPage(value); };
    const {  data, error, isLoading, isError }  = useQuery('popularMovies', getPopularMovies)

   

    if (isLoading) {
        return <Spinner />
      }
    
      if (isError) {
        return <h1>{error.message}</h1>
      }  
      const movies = data.results;   

    
    
      return (
          
        
        <PageTemplate
          title="Popular Movies"
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


          //<Pagination count={data.total_pages} style={{position: 'absolute' , left:'50%',transform:'translate(-50%)'} } page={page} onChange={handleChange}/>

        

      );


};





export default PopularMoviesPage;