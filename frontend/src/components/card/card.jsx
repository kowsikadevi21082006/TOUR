import env from "react-dotenv"
import "./card.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  
  return (
    <Link to={`/tours/${data._id}`} className="card">
      <div className="image">
        <img src={process.env.REACT_APP_SERVER_URL+data.photo} alt="location image" />
        {data.featured && <div className="featured">Featured</div>}
      </div>
      <div className="content">
        <div className="set-1">
          <div className="location">
            <div className="icon">
              <IoLocationOutline />
            </div>
            <p>{data.city}</p>
          </div>
          <div className="rating">
            <div className="icon">
              <FaStar />
            </div>
            <p>
              {data.reviewStats.avgRatings||0}({data.reviewStats.totalReviews})
            </p>
          </div>
        </div>
        <div className="set-2">{data.title}</div>
        <div className="set-3">
          <div className="price">
            <span className="highlight">${data.price}</span>/person
          </div>
          <div className="btn book-now">Book Now</div>
        </div>
      </div>
    </Link>
  );
}
