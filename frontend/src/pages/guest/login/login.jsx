import "./login.css";
import loginImage from "@/assets/media/login.png";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import app from "@/feathers";
import { logInUser, logOutUser } from "../../../redux/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    strategy: "local",
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

  async function loginUser(){
    try {
      
      const response = await app.authenticate(userData);
      
      dispatch(logInUser({
        _id: response.user._id,
        username:response.user.username,
        email : response.user.email,
        accessToken : response.accessToken
      }))
      navigate("/")
      window.alert(`User "${response.user.username}" is logged-in successfully!`)

    } catch (err) {
      
      window.alert("invalid login");
      console.log("authentication err", err);
      dispatch( logOutUser() )
    }
  }

  return (
    <div className="login">
      <div className="login-content">
        <div className="left">
          <img src={loginImage} alt="login image" />
        </div>
        <div className="right">
          <div className="floating-icon">
            <FaUser />
          </div>
          <div className="form">
            <h1>Login</h1>
            {/* <input type="text" name="username" placeholder="username" /> */}
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
            <div className="btn" onClick={loginUser}>Login</div>
            <p className="go-to-login">
              Dont have an account?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
