import { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const useSingleRow = (fetchUrl) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await instance.get(fetchUrl);
        setMovies(response.data.items); // Update this line
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  return { movies, loading, error };
};

export default useSingleRow;
