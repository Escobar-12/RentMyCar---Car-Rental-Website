
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import ApplicationContext from '../context/applicationContext';

export function useRole() {
  const { fetchWithToken } = useContext(ApplicationContext);

  return useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      try 
      {
        let res = await fetchWithToken("http://localhost:5007/auth/isAdmin", { method: "GET" });

        if (res.ok) 
        {
          const data = await res.json();
          return data.message; 
        }

        res = await fetchWithToken("http://localhost:5007/auth/isEditor", { method: "GET" });

        if (res.ok) 
        {
          const data = await res.json();
          return data.message;
        }

        return 2000;

      } 
      catch (err) 
      {
        console.error("Error fetching user role:", err);
        throw new Error("Failed to fetch user role");
      }
    },
    enabled: true,
    retry: 1, 
  });
}
