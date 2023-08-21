"use client";
import { useState, useEffect } from "react";

const useFetchData = (apiEndpoints) => {
  const [saladData, setSaladData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (apiUrl) => {
      try {
        const response = await fetch(`./api/${apiUrl}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${apiUrl}`);
        }
        return response.json();
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [apiUrl]: error.message,
        }));
        throw error;
      }
    };

    const promises = apiEndpoints.map((apiEndpoint) => fetchData(apiEndpoint));

    Promise.all(promises)
      .then((dataArray) => {
        setLoading(false);
        setSaladData(
          apiEndpoints.reduce((acc, endpoint, idx) => {
            acc[endpoint] = dataArray[idx];
            return acc;
          }, {})
        );
      })
      .catch(() => {
        setLoading(false);
      });
  }, [apiEndpoints]);

  return { saladData, setSaladData, errors, loading };
};

export default useFetchData;
