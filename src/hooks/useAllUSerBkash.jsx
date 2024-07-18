import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUserBkash = () => {
  const { data: allBkash = [], refetch } = useQuery({
    queryKey: ["allBkash"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-bkash-info`
      );
      return res.data;
    },
  });

  return { allBkash, refetch };
};

export default useAllUserBkash;
