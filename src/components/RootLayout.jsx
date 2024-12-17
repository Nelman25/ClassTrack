import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <div className="max-h-screen overflow-y-hidden">
      <Header />
      <main className="flex mx-auto">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
