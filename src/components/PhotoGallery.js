import React, { useEffect, useState } from "react";
import "./PhotoGallery.css";
import { useInView } from "react-intersection-observer";
import axios from "../api/axios";

function PhotoGallery() {
  const [photos, setPhotos] = useState();
  const BASE_URL = "https://jcstudios-api.onrender.com/";
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  const { ref: galleryRef, inView: myGalleryIsVisible } = useInView();

  useEffect(() => {
    axios
      .get("/guestphoto")
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 ref={myRef} className={myElementIsVisible ? "animateMyref" : ""}>
        Photo Projects
      </h1>
      <div
        ref={galleryRef}
        className={`${"gallery"} ${
          myGalleryIsVisible ? "gallery-animate" : ""
        }`}
        id="gallery"
      >
        <div className="gallery__column">
          {photos?.length ? (
            <div>
              {photos.slice(0, 3).map((item, index) => (
                <div className="gallery__link" key={item._id}>
                  <figure className="gallery__thumb" key={item._id}>
                    <a href="/photo-gallery">
                      <img
                        key={item._id}
                        src={BASE_URL + item.file_location}
                        alt="Portrait by Jervine Cordero"
                        className="gallery__image"
                      />
                    </a>
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <p>No photos to Display</p>
          )}
        </div>
        <div className="gallery__column">
          {photos?.length ? (
            <div>
              {photos.slice(3, 6).map((item, index) => (
                <div className="gallery__link" key={item._id}>
                  <figure className="gallery__thumb" key={item._id}>
                    <a href="/photo-gallery">
                      {" "}
                      <img
                        key={item._id}
                        src={BASE_URL + item.file_location}
                        alt="Portrait by Jervine Cordero"
                        className="gallery__image"
                      />
                    </a>
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <p>No photos to Display</p>
          )}
        </div>
        <div className="gallery__column">
          {photos?.length ? (
            <div>
              {photos.slice(6, 9).map((item, index) => (
                <div className="gallery__link" key={item._id}>
                  <figure className="gallery__thumb" key={item._id}>
                    <a href="/photo-gallery">
                      {" "}
                      <img
                        key={item._id}
                        src={BASE_URL + item.file_location}
                        alt="Portrait by Jervine Cordero"
                        className="gallery__image"
                      />
                    </a>
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <p>No photos to Display</p>
          )}
        </div>
        <div className="gallery__column">
          {photos?.length ? (
            <div>
              {photos.slice(9, 12).map((item, index) => (
                <div className="gallery__link" key={item._id}>
                  <figure className="gallery__thumb" key={item._id}>
                    <a href="/photo-gallery">
                      {" "}
                      <img
                        key={item._id}
                        src={BASE_URL + item.file_location}
                        alt="Portrait by Jervine Cordero"
                        className="gallery__image"
                      />
                    </a>
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <p>No photos to Display</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PhotoGallery;
