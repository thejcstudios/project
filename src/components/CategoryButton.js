import React, { useState } from "react";
import "./CategoryButton.css";

function CategoryButton() {
  return (
    <div>
      <section className="category">
        <div className="card-grid">
          <a className="card" href="/video-gallery-corporate">
            <div
              className="card__background"
              style={{
                backgroundImage: "url(" + "./images/category3.jpeg" + ")",
              }}
            ></div>
            <div className="card__background"></div>
            <div className="card__content">
              <p className="card__category">Category</p>

              <h3 className="card__heading">Corporate</h3>
            </div>
          </a>
          <a className="card" href="/video-gallery-wedding">
            <div
              className="card__background"
              style={{
                backgroundImage: "url(" + "./images/category5.jpeg" + ")",
              }}
            ></div>
            <div className="card__content">
              <p className="card__category">Category</p>
              <h3 className="card__heading">Wedding</h3>
            </div>
          </a>
          <a className="card" href="/video-gallery-kidsevent">
            <div
              className="card__background"
              style={{
                backgroundImage: "url(" + "./images/category1.jpeg" + ")",
              }}
            ></div>
            <div className="card__content">
              <p className="card__category">Category</p>
              <h3 className="card__heading">Kids Event</h3>
            </div>
          </a>
          <a className="card" href="/video-gallery-pageant">
            <div
              className="card__background"
              style={{
                backgroundImage: "url(" + "./images/category4.jpeg" + ")",
              }}
            ></div>
            <div className="card__content">
              <p className="card__category">Category</p>
              <h3 className="card__heading">Pageant</h3>
            </div>
          </a>
          <a className="card" href="/video-gallery-documentary">
            <div
              className="card__background"
              style={{
                backgroundImage: "url(" + "./images/category2.jpeg" + ")",
              }}
            ></div>
            <div className="card__content">
              <p className="card__category">Category</p>
              <h3 className="card__heading">Documentary</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

export default CategoryButton;
