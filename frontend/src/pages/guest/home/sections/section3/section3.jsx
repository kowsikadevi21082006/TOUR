import "./section3.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiSolidCustomize } from "react-icons/bi";
import { RiGuideFill } from "react-icons/ri";

export default function Section3() {
  return (
    <div className="section-3">
      <div className="intro">
        <div className="title">What we serve</div>
        <h1>We offer our<br/>best services</h1>
      </div>
      <div className="box-1">
        <div className="icon">
          <TiWeatherPartlySunny />
        </div>
        <div className="title">Calculate Weather</div>
        <div className="content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
          asperiores.
        </div>
      </div>
      <div className="box-2">
        <div className="icon">
          <RiGuideFill />
        </div>
        <div className="title">Best Tour Guide</div>
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
          officia accusamus?
        </div>
      </div>
      <div className="box-3">
        <div className="icon">
          <BiSolidCustomize />
        </div>
        <div className="title">Customization</div>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur rem sato elchape nemo adipisicing elit.
        </div>
      </div>
    </div>
  );
}
