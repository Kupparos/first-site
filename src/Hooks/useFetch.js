import { useState } from "react";

export const useFetch = (callback) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetching(...args) {
    try {
      await callback(...args)
    } catch (error) {
       setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  return [fetching, loading, error]
};
