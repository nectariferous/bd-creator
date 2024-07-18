import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUSerNid = () => {
  const { data: nid = [], refetch } = useQuery({
    queryKey: ["nid"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-nid`
      );
      return res.data;
    },
  });

  return { nid, refetch };
};

export default useAllUSerNid;
