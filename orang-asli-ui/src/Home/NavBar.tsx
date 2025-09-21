// import { Routes, Route, useLocation } from "react-router-dom";
// import Home from "./Home";\
import { Navbar } from "../assets";

const NavBar = () => {
  // const location = useLocation();
  // const isHome = location.pathname === "/";

  return (
    <div className="relative h-16 flex items-center justify-between px-8 py-3 mb-8 text-xl text-primary-dark-brown font-medium overflow-hidden">
      <img
        src={Navbar}
        alt="navbar-background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default NavBar;
