import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import NavbarBanner from "../Navbar/NavbarBanner";


export default function HomeLayout() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Navbar />
        <NavbarBanner />
        <Outlet/>
        <Footer />
      </main>
    </>
  );
}
