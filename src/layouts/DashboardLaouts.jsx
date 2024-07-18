import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/Picsart_24-05-27_18-34-27-178.png";
import { adminNavData, navDatas } from "../data/data";
import useAdmin from "../hooks/useUser";
import Navbar from "../pages/shere/navbar/Navbar";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const DashboardLaouts = () => {
  const { isAdmin } = useAdmin();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={`drawer ${drawerOpen ? "drawer-open" : ""} lg:drawer-open`}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar with drawer toggle button */}
        <div className="flex justify-between items-center z-10 p-4 lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
            onClick={handleDrawerToggle}
          >
            {drawerOpen ? <FaTimes /> : <FaBars />}
          </label>
          <Navbar />
        </div>
        {/* Navbar for larger screens */}
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={handleDrawerToggle}
        ></label>

        <div className="bg-slate-50 h-full flex flex-col z-10 relative">
          <Link to={"/"}>
            <div className="md:p-4">
              <img src={logo} className="h-24 md:w-72 w-64" alt="" />
            </div>
          </Link>
          <div className="flex-grow overflow-y-auto">
            <ul className="menu pt-0 text-base-content">
              {/* Sidebar content */}
              {isAdmin.isAdmin
                ? adminNavData.map((nav, index) => (
                    <li key={index}>
                      <NavLink
                        exact
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#0069ff] text-white"
                            : "text-[15px] my-2 hover:text-[#0066FF]"
                        }
                        to={nav.path}
                        onClick={handleLinkClick}
                      >
                        {nav?.icon ? (
                          nav?.icon
                        ) : (
                          <img
                            src={nav?.img}
                            className="h-6 w-6 rounded-full"
                            alt=""
                          />
                        )}
                        {nav.element}
                      </NavLink>
                    </li>
                  ))
                : navDatas.map((nav, index) => (
                    <li key={index}>
                      <NavLink
                        exact
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#0069ff] text-white"
                            : "text-[15px] my-2 hover:text-[#0066FF]"
                        }
                        to={nav.path}
                        onClick={handleLinkClick}
                      >
                        {nav?.icon ? (
                          nav?.icon
                        ) : (
                          <img
                            src={nav?.img}
                            className="h-6 w-6 rounded-full"
                            alt=""
                          />
                        )}
                        {nav.element}
                      </NavLink>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLaouts;
