import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUSerBkashPin = () => {
  const { data: bkashPin = [], refetch } = useQuery({
    queryKey: ["bkashPin"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-bkash-pin`
      );
      return res.data;
    },
  });

  return { bkashPin, refetch };
};

export default useAllUSerBkashPin;
