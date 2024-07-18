import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useAllBioMatrics = () => {
  const { user } = useContexts();
  const { data: biometric = [], refetch } = useQuery({
    queryKey: ["biometric"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-all-biometric?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { biometric, refetch };
};

export default useAllBioMatrics;
