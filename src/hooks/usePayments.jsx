import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePayment = () => {
  const { data: payments = false, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/payments`
      );
      return res.data;
    },
  });

  return { payments, refetch };
};

export default usePayment;
