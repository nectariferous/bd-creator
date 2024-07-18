import Navbar from "./pages/shere/navbar/Navbar";

import { Outlet } from "react-router-dom";
import Footer from "./pages/shere/footer/Footer";
import { Toaster } from "react-hot-toast";
import AppComponnets from "./componnets/AppComponnets";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <AppComponnets />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
