import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUserNogod = () => {
  const { data: nogod = [], refetch } = useQuery({
    queryKey: ["nogod"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-nogod-info`
      );
      return res.data;
    },
  });

  return { nogod, refetch };
};

export default useAllUserNogod;
