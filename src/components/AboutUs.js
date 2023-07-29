import React from "react";
import "./About.css";
import { useInView } from "react-intersection-observer";

function AboutUs() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  return (
    <>
      <h1
        ref={myRef}
        className={myElementIsVisible ? "animateMyref" : "hidden"}
        id="about-us"
      >
        About Us
      </h1>

      <div className="aboutus__wrapper">
        <div className="about__info">
          <h2>
            #1 Multimedia Editing and Event coverage with 5 years of experience.
          </h2>
          <p>
            Anyone can take photos but not everyone can capture the moments.
            Relax, enjoy and celebrate. We at JC studios will capture it for
            you!
          </p>
          <ul className="skills">
            <li className="skills1">
              Photography<span>90%</span>
            </li>
            <li className="skills2">
              Videography<span>96%</span>
            </li>
            <li className="skills3">
              Video Editing<span>97%</span>
            </li>
            <li className="skills4">
              Photo Editing<span>95%</span>
            </li>
          </ul>
        </div>
        <div className="about__img"></div>
        <p></p>
      </div>
    </>
  );
}

export default AboutUs;
