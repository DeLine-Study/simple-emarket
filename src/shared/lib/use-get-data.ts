import { useEffect, useState } from "react";

export const useGetData = <T>(query: Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    setIsLoading(true);
    query
      .then((res) => {
        setData(res);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  return {
    isLoading,
    data,
  };
};
