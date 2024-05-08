import env from "react-dotenv";
import "./viewTour.css";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import userIcon from "@/assets/media/user.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app from "@/feathers";
import { useSelector } from "react-redux";

export default function ViewTour() {
  const navigate = useNavigate();
  const userSession = useSelector((state) => state.user);
  const { tourId } = useParams();
  const [data, setData] = useState(null);
  const reviewInputRef = useRef();
  const [reviewRating, setReviewRating] = useState(null);
  const ratingStarContainer = useRef();
  const [reviewData, setReviewData] = useState([]);
  const reviewLoadLimit = 5;
  const [isMoreReviewAvailable, setIsMoreReviewAvailable] = useState(false);
  const [avgRatings, setAvgRatings] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await app.service("tours").get(tourId);
        setData(response);
        setBookingData({
          tourId,
          fullName: "",
          phoneNumber: "",
          tourDate: "" + Date.now(),
          bookingDate: "" + Date.now(),
          pricePerPerson: "" + response.price,
          numOfGuests: "0",
          serviceCharge: "10", //Service charge constant
          totalPaid: "10",
        });
        setAvgRatings(response.reviewStats.avgRatings);
        setTotalRatings(response.reviewStats.totalReviews);

        const reviewResponse = await app.service("reviews").find({
          query: {
            tourId,
            $skip: 0,
            $limit: reviewLoadLimit,
            $sort: {
              createdDate: -1,
            },
          },
        });
        setReviewData(reviewResponse.data);
        if (
          reviewResponse.skip + reviewResponse.limit >=
          reviewResponse.total
        ) {
          setIsMoreReviewAvailable(false);
        } else {
          setIsMoreReviewAvailable(true);
        }
      } catch (error) {
        console.log(">>", error);
        return;
      }
    })();
  }, []);

  const [bookingData, setBookingData] = useState();

  function handleInputChange(e) {
    setBookingData((prev) => {
      return {
        ...prev,
        [e.target.name]: " " + e.target.value,
      };
    });
  }

  async function makeBooking() {
    try {
      let constructedData = {
        ...bookingData,
        userId: userSession.userData._id,
        bookingDate: "" + Date.now(),
        totalPaid:
          "" +
          (parseInt(data.price * (bookingData.numOfGuests || 0)) +
            parseInt(bookingData.serviceCharge)),
      };

      const response = await app.service("bookings").create(constructedData);

      navigate("/booking-success");
    } catch (err) {
      window.alert(err.message);
      console.log(err);
    }
  }

  async function createReview() {
    try {
      if (!userSession.userData._id) {
        window.alert("Log in to add a review");
        return;
      }
      if (reviewRating == null || !(reviewRating >= 1 && reviewRating <= 5)) {
        window.alert(
          "Select your rating for this trip from the scale of 1 to 5 to share."
        );
        return;
      }
      let reviewText = reviewInputRef.current.value;
      if (reviewText.trim().length == 0) {
        window.alert("Write your review to share. ");
        return;
      }
      let newReviewData = {
        tourId,
        userId: userSession.userData._id,
        userName: userSession.userData.username,
        createdDate: Date.now(),
        reviewText: reviewInputRef.current.value,
        reviewRating,
      };
      const response = await app.service("reviews").create(newReviewData);
      window.alert("Your review is added successfully");
      setReviewData((prev) => {
        return [response, ...prev];
      });

      // clear inputs
      reviewInputRef.current.value = "";
      unselectRatingStar();

      // update avg & total for the new added data.
      // simple UI only update. not fetched from backend
      setAvgRatings((prev) =>
        parseFloat(
          (prev * totalRatings + reviewRating) / (totalRatings + 1)
        ).toFixed(1)
      );
      setTotalRatings((prev) => prev + 1);
      
    } catch (err) {
      window.alert(err.message);
      console.log(err);
    }
  }

  function selectRatingStar(e) {
    let element = e.target;
    while (!element.classList.contains("rating-star")) {
      element = element.parentElement;
    }
    setReviewRating(parseInt(element.getAttribute("star-value")));
    unselectRatingStar();
    element.classList.add("star-selected");
  }

  function unselectRatingStar() {
    ratingStarContainer.current
      .getElementsByClassName("star-selected")[0]
      ?.classList.remove("star-selected");
  }

  useEffect(() => {}, [reviewData]);

  async function loadMoreReviews() {
    try {
      const reviewResponse = await app.service("reviews").find({
        query: {
          tourId,
          $skip: reviewData.length,
          $limit: reviewLoadLimit,
          $sort: {
            createdDate: -1,
          },
        },
      });
      setReviewData((prev) => [...prev, ...reviewResponse.data]);
      if (reviewResponse.skip + reviewResponse.limit >= reviewResponse.total) {
        setIsMoreReviewAvailable(false);
      } else {
        setIsMoreReviewAvailable(true);
      }
    } catch (error) {
      window.alert(error.message);
      console.log(error);
    }
  }

  if (data) {
    return (
      <div className="view-tour">
        <div className="main">
          <div className="image">
            <img
              src={process.env.REACT_APP_SERVER_URL + data.photo}
              alt="tour image"
            />
          </div>
          <div className="description">
            <div className="set-1">
              <h1>Westminister Bridge</h1>
            </div>
            <div className="set-2">
              <div className="icon">
                <FaStar />
              </div>
              {avgRatings} ( {totalRatings} ratings )
            </div>
            <div className="set-3">
              <div className="location">
                <div className="icon">
                  <IoLocationOutline />
                </div>
                <div className="description">{data.city}</div>
              </div>
              <div className="price">
                <div className="icon">
                  <LuCircleDollarSign />
                </div>
                <div className="description">${data.price}/per person</div>
              </div>
              <div className="people">
                <div className="icon">
                  <IoPeopleOutline />
                </div>
                <div className="description">{data.maxGroupSize} people</div>
              </div>
            </div>
            <h3 className="set-4">Description</h3>
            <p className="set-5">{data.desc}</p>
          </div>
          <div className="reviews">
            <h1 className="set-1">Reviews({totalRatings})</h1>
            <div className="set-2" ref={ratingStarContainer}>
              <div
                className="star-5 rating-star"
                onClick={selectRatingStar}
                star-value={5}
              >
                5{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div
                className="star-4 rating-star"
                onClick={selectRatingStar}
                star-value={4}
              >
                4{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div
                className="star-3 rating-star"
                onClick={selectRatingStar}
                star-value={3}
              >
                3{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div
                className="star-2 rating-star"
                onClick={selectRatingStar}
                star-value={2}
              >
                2{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div
                className="star-1 rating-star"
                onClick={selectRatingStar}
                star-value={1}
              >
                1{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
            </div>
            <div className="set-3">
              <input
                type="text"
                placeholder="Share your thoughts..."
                ref={reviewInputRef}
                maxLength={80}
              />
              <div className="btn" onClick={createReview}>
                Submit
              </div>
            </div>
            <div className="set-4 reviews">
              {reviewData.map((review) => {
                return (
                  <div className="review" key={review._id}>
                    <div className="left">
                      <img src={userIcon} alt="User icon" />
                    </div>
                    <div className="center">
                      <div className="username">
                        <b>{review.userName}</b>
                      </div>
                      <div className="review-posted-date">
                        {review.createdTime}
                      </div>
                      <div className="review">{review.reviewText}</div>
                    </div>
                    <div className="right">
                      <span>{review.reviewRating}</span>
                      <div className="icon">
                        <FaStar />
                      </div>
                    </div>
                  </div>
                );
              })}
              {isMoreReviewAvailable && (
                <div className="load-more" onClick={loadMoreReviews}>
                  <p>load more reviews...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="booking">
          <div className="set-1">
            <div className="left">
              <span className="highlight">${data.price}</span>
              <span className="light-text">/ per person</span>
            </div>
            <div className="right">
              <FaStar /> {avgRatings}({totalRatings})
            </div>
          </div>

          <div className="set-2">
            <h3>Information</h3>
            <div className="form">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone"
                onChange={handleInputChange}
              />
              <div>
                <input
                  type="date"
                  name="tourDate"
                  placeholder="dd/mm/yyyy"
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="numOfGuests"
                  placeholder="Number of Guests"
                  onChange={handleInputChange}
                  min={0}
                  max={data.maxGroupSize}
                />
              </div>
            </div>
            <div className="billing">
              <div className="set-1">
                <div className="left">
                  ${data.price} x {bookingData.numOfGuests || 0} person
                </div>
                <div className="right">
                  ${data.price * (bookingData.numOfGuests || 0)}
                </div>
              </div>
              <div className="set-2">
                <div className="left">Service Charge</div>
                <div className="right">${bookingData.serviceCharge}</div>
              </div>
              <div className="set-3">
                <div className="left">
                  <b>Total</b>
                </div>
                <div className="right">
                  <b>
                    $
                    {parseInt(data.price * (bookingData.numOfGuests || 0)) +
                      parseInt(bookingData.serviceCharge)}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="btn set-3" onClick={makeBooking}>
            Book Now!
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}
