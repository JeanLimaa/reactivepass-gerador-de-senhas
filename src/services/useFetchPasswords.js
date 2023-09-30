import { useState, useEffect } from "react";

export const useFetchPasswords = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setDataFromServer(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataFromServer, loading, setDataFromServer };
};
