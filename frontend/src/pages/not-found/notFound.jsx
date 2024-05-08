import "./notFound.css"
import notFoundImage from "@/assets/media/404-not-found.png"
import { useNavigate } from "react-router-dom"
import { AiFillHome } from "react-icons/ai";

export default function NotFound() {

  const navigate = useNavigate()

  return (
    <div className="not-found">
        <div className="not-found-content">
            <img src={notFoundImage} alt="" />
            <h1 className="title">Oooops!</h1>
            <h3 className="content">This page is not found</h3>
            <h5 className="description">Return to home page?</h5>
            <div className="btn" onClick={()=>navigate("/")}><AiFillHome />Home</div>
        </div>
    </div>
  )
}
