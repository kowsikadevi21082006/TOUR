import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/guest/home/home";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/guest/login/login";
import Register from "./pages/guest/register/register";
import NotFound from "./pages/not-found/notFound";
import AllTours from "./pages/guest/allTours/allTours";
import ViewTour from "./pages/guest/viewTour/viewTour";
import BookingSuccess from "./pages/guest/bookingSuccess/bookingSuccess";
import { useSelector } from "react-redux";
import MyBookings from "./pages/session/myBookings/myBookings";
import { useEffect } from "react";
import app from "./feathers";

function App() {
  const userStore = useSelector((state) => state.user);

  useEffect(()=>{
    // Entire APP's contructor
    if( userStore.isLoggedIn && userStore.userData.accessToken ){
      app.authentication.setAccessToken(userStore.userData.accessToken);
      (async ()=>{await app.reAuthenticate()})()

    }
  },[])

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours" element={<AllTours/>}></Route>
        <Route path="/tours/:tourId" element={<ViewTour />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
