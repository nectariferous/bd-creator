import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useALlBkash = () => {
  const { user } = useContexts();
  const { data: bkash = [], refetch } = useQuery({
    queryKey: ["bkash"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-bkash-info?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { bkash, refetch };
};

export default useALlBkash;
