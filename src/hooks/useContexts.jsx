import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useContexts = () => {
  return useContext(AuthContext);
};

export default useContexts;
