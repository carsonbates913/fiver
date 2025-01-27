import { useState, useEffect, useCallback } from 'react';

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState();

  const sendHttpRequest = useCallback(async (url, method = "GET", headers = {}, body = null) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw error;
    }
  }, []);


  return {isLoading, sendHttpRequest};
}