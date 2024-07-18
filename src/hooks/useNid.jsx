import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useNid = () => {
  const { user } = useContexts();
  const { data: nid = [], refetch } = useQuery({
    queryKey: ["nid"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-nid?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { nid, refetch };
};

export default useNid;
