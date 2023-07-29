import React, { useEffect, useState } from "react";
import "./css/VideoGallery.css";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const VideoCollection = () => {
  const [videos, setVideos] = useState();
  const [videoFile, setVideoFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();
  const [modalUpdate, setModalUpdate] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [file, setFile] = useState([]);
  const [thumbFile, setThumbFile] = useState([]);
  const [name, setName] = useState();
  const [progressBar, setProgressBar] = useState();
  const [introVideo, setIntroVideo] = useState();
  const [modalIntro, setModalIntro] = useState(false);
  const [modalUpdateIntro, setModalUpdateIntro] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const Toggle = (name) => {
    setVideoFile(name);
    setModal(!modal);
  };

  const Update = (id) => {
    setUserId(id);
    setModalUpdate(!modalUpdate);
  };
  const ToggleIntro = (name) => {
    setVideoFile(name);
    setModalIntro(!modalIntro);
  };

  const UpdateIntro = (id) => {
    setUserId(id);
    setModalUpdateIntro(!modalUpdateIntro);
  };

  const updateVideo = async () => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("thumb", thumbFile);
    formData.append("name", name);
    formData.append("id", userId);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgressBar(`${loaded}kb of ${total}kb | ${percent}%`);
        },

        withCredentials: true,
      });
      if (!response) {
        setErrMsg("Fail to Update! Please Reload Add Update Again");
      }

      window.location.reload(true);
    } catch (err) {}
  };

  const updateVideoIntro = async () => {
    const formData = new FormData();
    formData.append("video__gallery", file);
    formData.append("name", name);
    formData.append("id", userId);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/intro", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgressBar(`${loaded}kb of ${total}kb | ${percent}%`);
        },

        withCredentials: true,
      });
      if (!response) {
        setErrMsg("Fail to Update! Please Reload Add Update Again");
      }

      window.location.reload(true);
    } catch (err) {}
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVideos = async () => {
      try {
        const response = await axiosPrivate.get("/videos", {
          signal: controller.signal,
        });
        const userNames = response.data;
        console.log(response.data);
        isMounted && setVideos(userNames);
      } catch (err) {
        console.error(err);
        navigate("/admin", { state: { from: location }, replace: true });
      }
    };

    getVideos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getIntro = async () => {
      try {
        const response = await axiosPrivate.get("/intro", {
          signal: controller.signal,
        });
        const userNames = response.data;
        console.log(response.data);
        isMounted && setIntroVideo(userNames);
      } catch (err) {
        console.error(err);
        navigate("/admin", { state: { from: location }, replace: true });
      }
    };

    getIntro();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <>
      <div className="videoGallery__container">
        <h2> Intro Video Components</h2>
        <div className="videoGallery__wrapper">
          <h3>Intro Background</h3>
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Video ID</th>
                <th>Update</th>
              </tr>
            </thead>

            {introVideo?.length ? (
              <tbody>
                {introVideo.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => ToggleIntro(item.file_location)}>
                      <Link>{item.name}</Link>
                    </td>
                    <td>{item._id}</td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => UpdateIntro(item._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>No Videos to display</td>
                </tr>
              </tbody>
            )}
          </table>
          <h3>Intro Cards</h3>
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Update</th>
              </tr>
            </thead>

            {videos?.length ? (
              <tbody>
                {videos.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => Toggle(item.file_location)}>
                      <Link>{item.name}</Link>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => Update(item._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>No Videos to display</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Modal show={modal} close={Toggle} title="Videos">
        <iframe
          className="responsive-iframe"
          src={videoFile}
          allow="autoplay; fullscreen;"
          title="cards"
        ></iframe>
      </Modal>
      <Modal show={modalUpdate} close={Update} title="Update">
        <p>{errMsg}</p>
        <p>Name</p>
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="pwd_input"
          required
        />
        <p>Insert Video</p>
        <input
          type="file"
          placeholder="Name"
          id="file"
          className="file__input"
          accept="video/*"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p>Insert Thumbnail</p>
        <input
          type="file"
          placeholder="Name"
          id="file"
          className="file__input"
          accept="image/*"
          required
          onChange={(e) => setThumbFile(e.target.files[0])}
        />
        <button
          className="raise"
          id="raise"
          onClick={() => updateVideo(userId)}
        >
          Update
        </button>
        <div className="progress">
          <p>{progressBar}</p>
        </div>
      </Modal>
      <Modal show={modalIntro} close={ToggleIntro} title="Videos">
        <iframe
          className="responsive-iframe"
          src={videoFile}
          allow="autoplay; fullscreen;"
          title="cards"
        ></iframe>
      </Modal>
    </>
  );
};

export default VideoCollection;
