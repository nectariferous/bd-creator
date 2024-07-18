import { useQuery } from "@tanstack/react-query";
import useContexts from "./useContexts";
import axios from "axios";

// help to fech the isAdmin data

const useAdmin = () => {
  const { user } = useContexts();

  const { data: isAdmin = false, refetch } = useQuery({
    queryKey: ["isAdmins"],
    queryFn: async () => {
      const res = await axios.get(
        `https://telent-finder.vercel.app/api/v1/isAdmin?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { isAdmin, refetch };
};

export default useAdmin;
