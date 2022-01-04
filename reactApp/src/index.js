import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import { PublicPage, Movies, Profile, HomePage } from "./pages";
import LoginPage from "./loginPage";
import AuthProvider from "./authContext";
import PrivateRoute from "./privateRoute";
import AuthHeader from "./authHeader";
import SignUpPage from "./signUpPage";
import MovieProvider from "./contexts/moviesContext";
import MoviesContextProvider from "./contexts/moviesContext";


//adding movie imports
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import AddMovieReviewPage from './pages/addMovieReviewPage';
import dislikedMoviesPage from "./pages/dislikedMoviesPage"; // import disliked movies page
import PopularMoviesPage from "./pages/popularMoviesPage"; // import popular movies page
import TopRatedMoviesPage from "./pages/topRatedMoviesPage"; // import top rated movies page
import NowPlayingMoviesPage from "./pages/nowPlayingPage"; // import now playing movies page


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <MoviesContextProvider>
            {" "}
      <AuthProvider>
        <AuthHeader />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <MovieProvider>
        <SiteHeader />
       


        <Switch>
        <Route exact path="/movies/popularMovies" component={PopularMoviesPage} />
        <Route exact path="/movies/topMovies" component={TopRatedMoviesPage} /> 
        <Route exact path="/movies/nowPlayMovie" component={NowPlayingMoviesPage} /> 
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route exact path="/movies/disliked" component={dislikedMoviesPage} /> 

          <Route path="/public" component={PublicPage} />
          
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/movies" component={Movies} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/signup" component={SignUpPage} />

          <Route path="/movies/:id" component={MoviePage} />

          <Redirect from="*" to="/" />
        </Switch>

        
        </MovieProvider>
=
      </AuthProvider>
      </MoviesContextProvider>
    </BrowserRouter>

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  );
};

ReactDOM.render(<App />, document.getElementById("root"));