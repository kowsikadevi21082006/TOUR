import "./section1.css"
import React from 'react'

import { FcGlobe } from "react-icons/fc";
import section1_hero1 from "@/assets/media/hero-img01.jpg";
import section1_hero2 from "@/assets/media/hero-video.mp4";
import section1_hero3 from "@/assets/media/hero-img02.jpg";


export default function Section1() {
  return (
    <div className="section-1">
        <div className="left">
          <div className="set-1">
            <div className="heading-label">Know before you go</div>
            <FcGlobe className="icon-globe"/>
          </div>
          <div className="set-2">
            <h1>Travelling opens the door</h1>
            <h1>
              to creating <span className="highlight">memories</span>{" "}
            </h1>
          </div>
          <div className="set-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iste
            quam nihil consequuntur exercitationem. Corrupti nulla sed soluta,
            blanditiis minus itaque tempora debitis. Vitae, praesentium?
          </div>
        </div>
        <div className="right">
          <div className="media-container mc-1">
            <img src={section1_hero1} />
          </div>
          <div className="media-container mc-2">
            <video
              src={section1_hero2}
              autoPlay={true}
              muted={true}
              loop={true}
            />
          </div>
          <div className="media-container mc-3">
            <img src={section1_hero3} />
          </div>
        </div>
      </div>
  )
}
