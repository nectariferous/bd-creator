import useContexts from "../../../hooks/useContexts";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import userImage from "../../../assets/eagle_914956-368-removebg-preview.png";
import { useEffect } from "react";
const Navbar = () => {
  const { user, handleLogout } = useContexts();
  const { payments, refetch } = useAprovedPayments();
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (!payments) {
    return <h1>loading...</h1>;
  }

  const handleLogouts = () => {
    handleLogout();
  };
  return (
    <div className="navbar ">
      <div className=" flex-1"></div>
      <div className="flex-none gap-2">
        <div className="form-control">
          {user && (
            <button className="btn bg-[#0066FF] text-white text-xl">
              {payments?.data?.amount}
            </button>
          )}
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className=" w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL ? user.photoURL : userImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogouts}>Log Out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
