import React, { useState, useEffect } from "react";
import "./GuestPhoto.scss";
import axios from "../api/axios";
import Modal from "./modal/Modal";

function GuestPhoto() {
  const [image, setImage] = useState();
  const [modal, setModal] = useState(false);
  const [location, setlocation] = useState(false);
  const BASE_URL = "https://jcstudios-api.onrender.com";

  const Toggle = (id) => {
    setlocation(id);
    setModal(!modal);
  };

  useEffect(() => {
    axios
      .get("/guestgallery")
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {image?.length ? (
        <section id="portfolio">
          {image.map((item, index) => (
            <div className="project" key={item._id}>
              <img
                key={item._id}
                alt="JC Studios"
                className="project__image"
                src={BASE_URL + item.file_location}
              />
              <p>{item.name}</p>
              <h3 className="grid__title"> {item.category}</h3>
              <div className="grid__overlay">
                <button
                  className="viewbutton"
                  key={item.index}
                  onClick={() => Toggle(item.file_location)}
                >
                  view more
                </button>
              </div>
            </div>
          ))}
          <div className="overlay">
            <div className="overlay__inner">
              <button className="close">close X</button>
              <img alt="JC Studios" />
            </div>
          </div>
        </section>
      ) : (
        <div>No Videos to Display</div>
      )}
      <Modal show={modal} close={Toggle} title="Images">
        <img src={BASE_URL + location} alt="JC Studios" />
      </Modal>
    </div>
  );
}

export default GuestPhoto;
