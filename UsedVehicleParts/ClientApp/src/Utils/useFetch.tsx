import { useState, useEffect } from "react";

function useFetch<T = any>(url: string, options: RequestInit): [T | null, any, boolean] {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();

      setResponse(json);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
      fetchData();
    },
    []);

  return [response, error, isLoading];
}

export default useFetch;