import { Outlet } from "react-router-dom";
import NavBar from "./Home/NavBar";
export default function Layout() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[linear-gradient(135deg,#f5f1e8_0%,#e8dcc0_100%)]">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}