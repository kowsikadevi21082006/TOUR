import "./allTours.css";
import tourVideo from "@/assets/media/bg-video.mp4";
import Section2 from "../home/sections/section2/section2";
import Card from "@/components/card/card";
import { useEffect, useState } from "react";
import app from "@/feathers";
import { useSearchParams } from "react-router-dom";

export default function AllTours() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [allTourData, setAllTourData] = useState([]);
  const [searchData, setSearchData] = useState({})

  async function getAllTours() {
    try {
      let location = searchParams.get("location")
      let distance = searchParams.get("distance")
      let maxGroupSize = searchParams.get("maxGroupSize")
      setSearchData({location, distance, maxGroupSize})

      let query = {};
      
      if (distance) {
        query.distance = {
          $lte: distance
        };
      }
      if (maxGroupSize) {
        query.maxGroupSize = {
          $lte: maxGroupSize
        };
      }

      const response = await app.service("tours").find({query});
      setAllTourData(response.data);
    } catch (error) {
      console.log(">>", error);
      return;
    }
  }

  useEffect(() => {
    getAllTours();
  }, [searchParams]);

  return (
    <div className="all-tours">
      <div className="video-card">
        <video src={tourVideo} autoPlay muted loop></video>
        <h1>Explore All Tour Packages</h1>
      </div>
      <div className="all-tours-content">
        <Section2 defaults={searchData}/>
        <div className="cards">
          {allTourData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
