import "./section2.css";
import { IoLocationSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { RiPinDistanceFill } from "react-icons/ri";
import app from "../../../../../feathers";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Section2({defaults}) {
  const locationRef = useRef();
  const maxDistanceRef = useRef();
  const maxPeopleRef = useRef();

  const navigate = useNavigate()

  async function searchTours() {
    try {
      let query = {};
      let queryParam = ""
      if (locationRef.current.value) {        
        query.location=locationRef.current.value
        queryParam += "location="+locationRef.current.value+"&"
      }
      if (maxDistanceRef.current.value) {
        query.distance = {
          $lte: maxDistanceRef.current.value,
        };
        queryParam += "distance="+maxDistanceRef.current.value+"&"
      }
      if (maxPeopleRef.current.value) {
        query.maxGroupSize = {
          $lte: maxPeopleRef.current.value,
        };
        queryParam += "maxGroupSize="+maxPeopleRef.current.value+"&"

      }
      // await app.service("tours").find({ query });
      navigate("/tours?"+queryParam)
    } catch (error) {
      window.alert(error.message);
      console.log(error);
    }
  }
  return (
    <div className="section-2">
      <div className="search-bar center">
        <div className="search-filters center">
          <div className="location center">
            <div className="icon">
              <IoLocationSharp />
            </div>
            <div className="main center">
              <p>Location</p>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
                defaultValue={defaults?.location || ""}
              />
            </div>
          </div>
          <div className="distance center">
            <div className="icon">
              <RiPinDistanceFill />
            </div>
            <div className="main center">
              <p>Max Distance</p>
              <input
                type="number"
                placeholder="Distance km"
                ref={maxDistanceRef}
                min={0}
                step={100}
                defaultValue={parseInt(defaults?.distance) || ""}
              />
            </div>
          </div>
          <div className="people center">
            <div className="icon">
              <IoPeopleSharp />
            </div>
            <div className="main center">
              <p>Max people</p>
              <input
                type="number"
                placeholder="0 people"
                ref={maxPeopleRef}
                min={0}
                defaultValue={defaults?.maxGroupSize || ""}
              />
            </div>
          </div>
        </div>
        <div className="search-action" onClick={searchTours}>
          <IoSearchSharp />
        </div>
      </div>
    </div>
  );
}
