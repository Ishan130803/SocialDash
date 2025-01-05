import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {

      const data = await 

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
