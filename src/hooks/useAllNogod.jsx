import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useAllNogod = () => {
  const { user } = useContexts();
  const { data: nogod = [], refetch } = useQuery({
    queryKey: ["nogod"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-nogod-info?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { nogod, refetch };
};

export default useAllNogod;
