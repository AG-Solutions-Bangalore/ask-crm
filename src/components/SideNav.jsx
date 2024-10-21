import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-blue-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[250px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/home" className="flex items-center justify-center p-4">
          <div className="flex items-center">
            <img
              src="../img/logo.png"
              alt="Logo"
              className="h-16 w-56"
            />
            
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to="/home">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Dashboard
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    profile
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/family-member">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Family Member
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/life-time-member">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Life Time Members
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/patron-member">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Patron Members
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          {/* // no need  */}

          {/* <li>
            <NavLink to="/pending-mid">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Pending MID
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/new-register">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    New Register
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/download">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Downloads
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/samaj">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Samaj
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/mahila">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                  Mahila
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/developer">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Developer
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li> */}

          {/* Add more hardcoded routes here as needed */}
        </ul>
      </div>
    </aside>
  );
};
export default SideNav;
