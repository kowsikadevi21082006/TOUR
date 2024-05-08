import "./bookingSuccess.css";
import thankYouImg from "@/assets/media/thank-you.png";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();
  return (
    <div className="booking-success">
      <div className="content">
        <img src={thankYouImg} alt="thank you image" />
        <h1>Your tour is <span className="highlight">booked!</span></h1>
        <div className="actions">
          <div
            onClick={() => navigate("/my-bookings")}
            className="btn view-booking"
          >
            view booking
          </div>
          <div onClick={() => navigate("/")} className="btn go-to-home">
            Go to home
          </div>
        </div>
      </div>
    </div>
  );
}
