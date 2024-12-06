import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="flex mx-auto ">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
