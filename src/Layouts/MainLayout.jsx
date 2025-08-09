import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const MainLayout = () => {
  return (
    <div className="bg-Background dark:bg-slate-900">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <main className="">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
