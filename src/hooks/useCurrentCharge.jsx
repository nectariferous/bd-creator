import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCurrentCharge = ({ name }) => {
  const { data: currentCharge = false, refetch } = useQuery({
    queryKey: ["currentCharge"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-currentCharge/${name}`
      );
      return res.data;
    },
  });

  return { currentCharge, refetch };
};

export default useCurrentCharge;
