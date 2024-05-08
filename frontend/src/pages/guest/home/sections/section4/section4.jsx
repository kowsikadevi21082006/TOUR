import "./section4.css";
import img from "@/assets/media/tour-img01.jpg";
import Card from "@/components/card/card";
import { useState, useEffect } from "react";
import app from "@/feathers"

export default function Section4() {
  
  const [data, setData] = useState([])

  async function getAllTours(){
    try {
      const response = await app.service("tours").find({
        query:{
          featured:true
        }
      });
      // console.log("response", response);
      setData(response.data)
    } catch (error) {
      console.log(">>",error)
      return
    }
  }

  useEffect(() => {
    getAllTours()
  }, []);

  return (
    <div className="section-4">
      <div className="heading-label">Explore</div>
      <h1>Our Featured Tours</h1>
      <div className="cards">
        {data.map( (tourData)=>(<Card data={tourData} key={tourData._id}/>) )}
        
      </div>
    </div>
  );
}
