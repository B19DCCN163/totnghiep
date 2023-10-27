import { Outlet } from "react-router-dom";
import { DataProvider } from "./../../DataContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export const AppLayout = () => (
  <div>      
    <Header />
    <Outlet />
    <Footer />
  </div>

);