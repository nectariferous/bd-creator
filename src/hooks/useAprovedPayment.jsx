import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContexts from "./useContexts";

const useAprovedPayments = () => {
  const { user } = useContexts();
  const { data: payments = false, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/get-payments?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { payments, refetch };
};

export default useAprovedPayments;
