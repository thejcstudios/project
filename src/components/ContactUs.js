import React from "react";
import "./ContactUs.css";
import { useInView } from "react-intersection-observer";

function ContactUs() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  return (
    <>
      <h1
        ref={myRef}
        className={myElementIsVisible ? "animateMyref" : "hidden"}
        id="contact"
      >
        Contact Us
      </h1>

      <div className="contact__container">
        <div className="contact__wrapper">
          <div className="contact__element">
            <ul>
              <h2>Contact Us</h2>
              <li>Email:jcstudios@gmail.com</li>
              <li>Contact Number: 0995 037 1821</li>
              <li>
                Facebook:{" "}
                <a href=" https://www.facebook.com/JCstudios28">
                  {" "}
                  https://www.facebook.com/JCstudios28
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
