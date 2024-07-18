import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useAllSinCopy = () => {
  const { user } = useContexts();
  const { data: sinCopy = [], refetch } = useQuery({
    queryKey: ["sinCopy"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-sign-copy?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { sinCopy, refetch };
};

export default useAllSinCopy;
