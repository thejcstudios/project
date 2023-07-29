import React from "react";
import VideoCollection from "../AdminComponents/VideoCollection";
import AdminNav from "../AdminComponents/AdminNav";
import AdminVideoGallery from "../AdminComponents/AdminVideoGallery";

function VideosGallery() {
  return (
    <div>
      <AdminNav />
      <VideoCollection />
      <AdminVideoGallery />
    </div>
  );
}

export default VideosGallery;
