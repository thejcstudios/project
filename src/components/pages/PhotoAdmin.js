import React from "react";
import PhotoCollection from "../AdminComponents/PhotoCollection";
import AdminNav from "../AdminComponents/AdminNav";
import AdminImageGallery from "../AdminComponents/AdminPhotoGallery";

function PhotoAdmin() {
  return (
    <div>
      <AdminNav />
      <PhotoCollection />
      <AdminImageGallery />
    </div>
  );
}

export default PhotoAdmin;
