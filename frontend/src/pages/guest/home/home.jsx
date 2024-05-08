import "./home.css";
import React from "react";
import Section1 from "./sections/section1/section1";
import Section2 from "./sections/section2/section2";
import Section3 from "./sections/section3/section3";
import Section4 from "./sections/section4/section4";

export default function Home() {
  return (
    <div className="home">
      <Section1 />
      <Section2 defaults={{}}/>
      <Section3/>
      <Section4/>
    </div>
  );
}
