import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import "./App.css";
import Home from "./components/pages/Home";
import Admin from "./components/pages/AdminPage";
import Register from "./components/pages/Register";
import Main from "./components/pages/Main";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Layout from "./components/Layout";
import VideosGallery from "./components/pages/VideosGallery";
import PersistLogin from "./components/AdminComponents/PersisLogin";
import PhotoAdmin from "./components/pages/PhotoAdmin";
import Feedback from "./components/pages/Feedback";
import GuestPhoto from "./components/pages/GuestPhotoGallery";
import GuestVideo from "./components/pages/guestVideoGallery";
import CorporateVideo from "./components/pages/Corporate";
import WeddingVideo from "./components/pages/Wedding";
import KidsVideo from "./components/pages/KidsEvent";
import PageantVideo from "./components/pages/Pageant";
import DocumentaryVideo from "./components/pages/Documentary";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

disableReactDevTools();

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div className="App">
      {loading ? (
        <div style={style}>
          <ClimbingBoxLoader
            color={"#ff8800"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*Public Route*/}
            <Route index element={<Home />} />
            <Route path="video-gallery" element={<GuestVideo />} />
            <Route
              path="video-gallery-corporate"
              element={<CorporateVideo />}
            />
            <Route path="video-gallery-wedding" element={<WeddingVideo />} />
            <Route path="video-gallery-kidsevent" element={<KidsVideo />} />
            <Route path="video-gallery-pageant" element={<PageantVideo />} />
            <Route
              path="video-gallery-documentary"
              element={<DocumentaryVideo />}
            />
            <Route path="photo-gallery" element={<GuestPhoto />} />
            <Route path="home" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            {/*Protected Route*/}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="main" element={<Main />} />
                <Route path="videogallery" element={<VideosGallery />} />
                <Route path="register" element={<Register />} />
                <Route path="photoadmin" element={<PhotoAdmin />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
