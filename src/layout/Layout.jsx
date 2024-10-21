import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";

const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="min-h-screen bg-green-200">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div className="p-4 xl:ml-[17rem]">
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        {children}
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
