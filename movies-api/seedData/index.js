import userModel from '../api/users/userModel';
import users from './users';
import dotenv from 'dotenv';
import movieModel from '../api/movies/movieModel';
import movies from './movies.js';

import Genre from '../api/genres/genreModel';
import genres from './genres.js';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
    console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

  if (process.env.SEED_DB) {
    loadUsers();
    loadGenres();//you may not need this line if you skipped the exercises
    loadMovies();//ADD THIS LINE
  }

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
    console.log('load movie data');
    console.log(movies.length);
    try {
      await movieModel.deleteMany();
      await movieModel.collection.insertMany(movies);
      console.info(`${movies.length} Movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
    }
  }

  export async function loadGenres() {
    console.log('load genre data');
    console.log(genres.length);
    try {
      await Genre.deleteMany();
      await Genre.collection.insertMany(genres);
      console.info(`${genres.length} Genres were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load genres : ${err}`);
    }
  }