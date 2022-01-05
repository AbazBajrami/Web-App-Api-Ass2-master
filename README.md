# Assignment 2 - Web API.

Name: Abaz Bajrami

## Features. 
 + Feature 1 -Added more get api routes
 + Feature 2 - Added customer authentication with email

## Installation Requirements

```bat
git clone https://github.com/AbazBajrami/Web-App-Api-Ass2-master.git
```

followed by installation

```bat
cd Web-App-Api-Ass2-master
cd movies-api
npm install
cd ..
cd reactApp
npm install
npm start
```

## API Configuration
```bat
REACT_APP_TMDB_KEY=
FAST_REFRESH=false
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
SEED_DB=false
SECRET=ilikecake
```

## Security and Authentication
My authentication is done using user front. You can sign up and account using your email, create a username, and password. 
One it's created, it will remain there. You can reset your password. 
## Integrating with React App
~~~Javascript
export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

  export const getFavourites = (username) => {
    return fetch(
        `/api/users/${username}/favourites`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

~~~



## Independent learning
I leanred about the userfront authenitcation. 

