import { useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContexts();

  if (user) {
    return children;
  } else {
    navigate("/");
  }
};

export default PrivateRoutes;
