import "./register.css";
import loginImage from "@/assets/media/login.png";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "@/feathers";

export default function Register() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function registerUser() {
    try {
      console.log("registering user with data :",userData);
      await app.service("users").create(userData);
      window.alert("User registered successfully. You can login now.");
      navigate("/login")
    } catch (err) {
      window.alert("error occured when trying to login. check console");
      console.log("authentication err", err);
    }
  }

  return (
    <div className="register">
      <div className="register-content">
        <div className="left">
          <img src={loginImage} alt="register image" />
        </div>
        <div className="right">
          <div className="floating-icon">
            <FaUser />
          </div>
          <div className="form">
            <h1>Register</h1>
            {/* <input type="text" name="username" placeholder="username" /> */}
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            <div className="btn" onClick={registerUser}>Register</div>
            <p className="go-to-register">
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
