import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, refetch };
};

export default useFetch;
