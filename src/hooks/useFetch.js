import { useState, useEffect } from "react";

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchFunction()
      .then(([response]) => {
        if (isMounted) setData(response);
      })
      .catch(([, err]) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return [data, error, loading];
};
