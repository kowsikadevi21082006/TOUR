import "./myBookings.css";
import React, { useEffect, useState } from "react";
import app from "../../../feathers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user_id = useSelector((state) => state.user.userData._id);
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await app.service("bookings").find({
          query: {
            userId: user_id,
          },
        });
        // console.log(response.data)
        setBookingsData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoggedIn) {
    return (
      <div className="my-bookings">
        <h1>My Bookings</h1>
        <div className="forms">
          {bookingsData.length==0 && (<p>No bookings yet</p>)}
          {bookingsData.map((bookingData) => {
            return (
              <div className="form">
                <table>
                  <tr>
                    <td><b>Booking ID:</b></td>
                    <td>{bookingData._id}</td>
                  </tr>
                  <TourDetails />

                  <tr>
                    <td>Full Name</td>
                    <td>{bookingData.fullName}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{bookingData.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Tour Date</td>
                    <td>{bookingData.tourDate}</td>
                  </tr>
                  <tr>
                    <td>Booking Date</td>
                    <td>
                      {new Date(
                        parseInt(bookingData.bookingDate)
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td>Price per person</td>
                    <td>${bookingData.pricePerPerson}</td>
                  </tr>
                  <tr>
                    <td>Guests Count</td>
                    <td>{bookingData.numOfGuests}</td>
                  </tr>
                  <tr>
                    <td>Service Charge</td>
                    <td>${bookingData.serviceCharge}</td>
                  </tr>
                  <tr>
                    <td>Total Paid</td>
                    <td>${bookingData.totalPaid}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    navigate("/not-found");
  }
}

function TourDetails() {
  const [tourDetails, setTourDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await app
          .service("tours")
          .get("66181037754ab731dcb2ccbf");
        setTourDetails(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <tr>
        <td>Location Name</td>
        <td>{tourDetails?.title}</td>
      </tr>
      <tr>
        <td>City</td>
        <td>{tourDetails?.city}</td>
      </tr>
    </>
  );
}
