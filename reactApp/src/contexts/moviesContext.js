import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies } from "../api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { movies: action.payload.result};
    default:
      return state;
  }
};

const MoviesContextProvider = props => {
  const [myReviews, setMyReviews] = useState( {} ) 
    //add dislike
    const [dislikedMovies, setDislike] = useState( [] )

    const addToDisliked = (movie) => {
      let newDislikedMovie = [];
      if(!dislikedMovies.includes(movie.id)){
        newDislikedMovie = [...dislikedMovies, movie.id];
      }
      setDislike(newDislikedMovie)
    };


    //Favs
    const [favorites, setFavorites] = useState( [] )
    const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites)
  };

    //remove
    const removeFromDislikedMovies = (movie) => {
      setDislike(dislikedMovies.filter(
        (mId) => mId !== movie.id
      ))
    };

   // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const [state, dispatch] = useReducer(reducer, { movies: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        setAuthenticated,
        favorites,
        dislikedMovies,
        addToFavorites,
        removeFromFavorites,
        addToDisliked,
        removeFromDislikedMovies,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider