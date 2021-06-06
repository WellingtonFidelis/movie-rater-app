import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { apiMovieRater } from "../services/api-movie-rater";

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await apiMovieRater.getMovies(token['mr-token'])
        .catch(error => setError(error));
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [token]);
  return [data, loading, error];
}

export { useFetch };