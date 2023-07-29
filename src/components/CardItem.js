import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "../api/axios";

function CardItem() {
  const { ref: videoRef, inView: myElementIsVisible } = useInView();
  const [videos, setVideos] = useState();

  useEffect(() => {
    axios
      .get("/guest")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {videos?.length ? (
        <li className="cards__item">
          {videos.map((item) => (
            <Link
              ref={videoRef}
              className={`${"cards__item__link"} ${
                myElementIsVisible ? "name-cards" : "hideMe"
              }`}
              key={item._id}
            >
              <iframe
                width="100%"
                height="100%"
                src={item.file_location}
                allow="autoplay; fullscreen"
                title="cards"
              ></iframe>
            </Link>
          ))}
        </li>
      ) : (
        <div>No Videos to Display</div>
      )}
    </>
  );
}

export default CardItem;
