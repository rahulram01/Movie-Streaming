// Services/GlobalApi.js

import axios from "axios";

// Load API keys from environment variables
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Securely loading TMDB API key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Securely loading OpenAI API key

const API = axios.create({ baseURL: `https://podstream.onrender.com/api` });

const movieBaseUrl = "https://api.themoviedb.org/3";
const movieByGenreBaseURL = `${movieBaseUrl}/discover/movie?api_key=${TMDB_API_KEY}`;
const movieSearchBaseURL = `${movieBaseUrl}/search/movie?api_key=${TMDB_API_KEY}`;

export const searchMovies = (query) =>
  axios.get(`${movieSearchBaseURL}&query=${encodeURIComponent(query)}`);

const getPopularMovies = () =>
  axios.get(`${movieBaseUrl}/trending/movie/day?api_key=${TMDB_API_KEY}`);

const getMovieByGenreId = (id) =>
  axios.get(movieByGenreBaseURL + "&with_genres=" + id);

export default {
  getPopularMovies,
  getMovieByGenreId,
};

export const OPENAI_KEY = OPENAI_API_KEY; // Using secured OpenAI API key

export const createPodcast = async (podcast, token) =>
  await API.post(
    "/podcasts",
    podcast,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getPodcasts = async () => await API.get("/podcasts");

export const addEpisodes = async (podcast, token) =>
  await API.post(
    "/podcasts/episode",
    podcast,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const favoritePodcast = async (id, token) =>
  await API.post(
    `/podcasts/favorit`,
    { id: id },
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true }
  );

export const getRandomPodcast = async () => await API.get("/podcasts/random");

export const getPodcastByTags = async (tags) =>
  await API.get(`/podcasts/tags?tags=${tags}`);

export const getPodcastByCategory = async (category) =>
  await API.get(`/podcasts/category?q=${category}`);

export const getMostPopularPodcast = async () =>
  await API.get("/podcasts/mostpopular");

export const getPodcastById = async (id) =>
  await API.get(`/podcasts/get/${id}`);

export const addView = async (id) => await API.post(`/podcasts/addview/${id}`);

export const searchPodcast = async (search) =>
  await API.get(`/podcasts/search?q=${search}`);
