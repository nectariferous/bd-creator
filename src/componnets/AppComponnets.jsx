import { Link } from "react-router-dom";
import useContexts from "../hooks/useContexts";
import useAdmin from "../hooks/useUser";

const AppComponnets = () => {
  const { user } = useContexts();
  const { isAdmin } = useAdmin();
  console.log(isAdmin.isAdmin);
  const dashboardPath = isAdmin.isAdmin
    ? "/dashboard/home"
    : "/dashboard/create-nid";
  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="hero-content text-center">
          <div className="">
            {user ? (
              <h1 className="text-5xl font-bold">{`Welcome back ${user?.displayName}`}</h1>
            ) : (
              <h1 className="text-5xl font-bold">Welcome dear please</h1>
            )}
            <p className="py-6"></p>
            <Link to={dashboardPath}>
              {" "}
              <button className=" btn-primary">visit dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppComponnets;
