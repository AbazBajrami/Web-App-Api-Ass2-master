import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link} from "react-router-dom";
import MoviesContextProvider from "./contexts/moviesContext";
import HomePage from "./pages/homePage";
import Userfront from "@userfront/react";

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


Userfront.init("demo1234");



const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});
const LoginForm = Userfront.build({
  toolId: "alnkkd",
});
const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});
function Home() {
  return (
    <div>
      <h2>Home</h2>
      <SignupForm />
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

function PasswordReset() {
  return (
    <div>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </div>
  );
}

function Dashboard() {
  function renderFn({ location }) {
    // If the user is not logged in, redirect to login
    if (!Userfront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }

    // If the user is logged in, show the dashboard
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>
        <pre>{userData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }

  return <Route render={renderFn} />;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />        

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <MoviesContextProvider> {" "}

      
        <Switch>

        <Route path="/login"><Login /></Route>
        <Route path="/reset">  <PasswordReset /></Route>
       <Route path="/dashboard"> <Dashboard />
      </Route><Route path="/"> <Home /> </Route>

        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />

       <Route exact path="/movies/popularMovies" component={PopularMoviesPage} />
        <Route exact path="/movies/topMovies" component={TopRatedMoviesPage} /> 
        <Route exact path="/movies/nowPlayMovie" component={NowPlayingMoviesPage} /> 
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route exact path="/movies/disliked" component={dislikedMoviesPage} /> 

        

        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />

          <Redirect from="*" to="/" />
          </Switch>

        
          </MoviesContextProvider>

          </div>
        </BrowserRouter>

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  );
};

ReactDOM.render(<App />, document.getElementById("root"));