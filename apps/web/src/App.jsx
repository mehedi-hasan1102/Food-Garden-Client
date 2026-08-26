import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Footer from "./Components/Footer";

import { useEffect, useState } from "react";
import Loading from "./Components/Loading";
import DarkModeSidebar from "./Components/DarkModeSidebar";
import BackToTop from './Components/BackToTop';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Navbar />
      <DarkModeSidebar />
      <BackToTop />
      {loading ? <Loading /> : <Outlet />}

      <Footer />
    </>
  );
}

export default App;
