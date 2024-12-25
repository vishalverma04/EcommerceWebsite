import { Outlet } from "react-router-dom";
import  Sidebar  from "../components/sidebar";

const BaseLayout = () => {
  return (
    <main className="page-wrapper flex h-screen">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
