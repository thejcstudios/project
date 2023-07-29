import React, { useEffect, useState } from "react";
import "./Comments.css";
import axios from "../api/axios";
import Modal from "./modal/Modal";

function Comments() {
  const BASE_URL = "https://jcstudios-api.onrender.com";
  const [feed, setFeed] = useState();
  const [modal, setModal] = useState(false);
  const [file, setVideoFile] = useState(false);

  const Toggle = (id) => {
    setVideoFile(id);
    setModal(!modal);
  };

  useEffect(() => {
    axios
      .get("/guestfeed")
      .then((res) => {
        setFeed(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="content" id="feedback">
        <h1>Our Feedbacks</h1>

        {feed?.length ? (
          <div className="video-gallery">
            {feed.map((item, index) => (
              <div className="gallery-item" key={item._id}>
                <img
                  src={BASE_URL + item.thumb_file_location}
                  alt="Jc Studios"
                />
                <div className="gallery-item-caption" key={item._id}>
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.info}</p>
                  </div>
                  <a onClick={() => Toggle(item.file_location)}>
                    <i className="" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Videos to Display</div>
        )}
      </div>

      <Modal show={modal} close={Toggle} title="Videos">
        <div class="video-container">
          <iframe
            className="responsive-iframe"
            src={file}
            allow="autoplay; fullscreen;"
            title="cards"
          ></iframe>
        </div>
      </Modal>
    </>
  );
}

export default Comments;
