import "./navbar.css";
import React from "react";
import logo from "@/assets/media/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import app from "../../feathers";
import { logOutUser } from "../../redux/userSlice";

export default function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.userData.username);

  async function logOut(){
    try{
      await app.authentication.logout()
      dispatch( logOutUser() )
      window.alert("User logged out successfully")
      navigate("/")
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="left">
          <img src={logo} alt="logo" />
        </div>
        <div className="right">
          <div className="set-1">
            <Link to="/" className="menu-item">
              Home
            </Link>
            <Link to="/" className="menu-item">
              About
            </Link>
            <Link to="/tours" className="menu-item">
              Tour
            </Link>
          </div>
          {!isLoggedIn ? (
            <div className="set-2">
              <Link to="/login" className="menu-item">
                Login
              </Link>
              <Link to="/register" className="menu-item menu-button">
                Register
              </Link>
            </div>
          ) : (
            <div className="set-3">
              <span className="menu-item">Hi {username || "user"}!</span>
              <Link to="/my-bookings" className="menu-item">My bookings</Link>
              <div className="menu-item menu-button" onClick={logOut}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
