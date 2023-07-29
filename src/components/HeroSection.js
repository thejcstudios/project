import React, { useState, useEffect } from "react";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button";
import axios from "../api/axios";

function HeroSection() {
  const [videos, setVideos] = useState();

  useEffect(() => {
    axios
      .get("/guestintro")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="hero-container" id="home">
      {videos?.length ? (
        <div className="intro_video">
          {videos.map((item) => (
            <iframe
              className="disableclick"
              title="intro"
              src={item.file_location}
              width="1500"
              height="750"
              loading="lazy"
              allow="autoplay; fullscreen; muted; encrypted-media; picture-in-picture; loop;"
              key={item._id}
            ></iframe>
          ))}
        </div>
      ) : (
        <div>No Videos to Display</div>
      )}
      <h2>We accept any kind of event</h2>
      <p>Corporate/Weddings/Kids Event/Business Advertisement</p>
      <div className="hero-btn1">
        <a
          href="https://m.me/JCstudios28"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="btn1"
            buttonStyle="btn1--outline"
            buttonSize="btn1--large"
          >
            Inquire Now
          </Button>
        </a>
        <a href="/video-gallery">
          <Button
            className="btn1"
            buttonStyle="btn1--primary"
            buttonSize="btn1--large"
          >
            Watch Sample <i className="far fa-play-circle" />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
