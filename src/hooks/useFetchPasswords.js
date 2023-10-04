import { useState, useEffect } from "react";

export const useFetchPasswords = () => {
  const [passwordList, setPasswordList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/viewprofile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const updateData = data || []
        setPasswordList(updateData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { passwordList, isLoading, error, setPasswordList };
};
