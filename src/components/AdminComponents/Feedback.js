import React, { useEffect, useState } from "react";
import "./css/VideoGallery.css";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const VideoCollection = () => {
  const [FeedBack, setFeedBack] = useState();
  const [FeedFile, setFeedFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [modalFeed, setModalFeed] = useState(false);
  const [thumbFile, setThumbFile] = useState([]);
  const [userId, setUserId] = useState();
  const [modalUpdateFeed, setModalUpdateFeed] = useState(false);
  const [modalUploadFeed, setModalUploadFeed] = useState(false);
  const [modalDeleteFeed, setModalDeleteFeed] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [info, setInfo] = useState();
  const [progressBar, setProgressBar] = useState();

  const ToggleFeed = (location) => {
    setFeedFile(location);
    setModalFeed(!modalFeed);
  };

  const UpdateFeed = (id) => {
    setUserId(id);
    setModalUpdateFeed(!modalUpdateFeed);
  };

  const UploadFeed = () => {
    setModalUploadFeed(!modalUploadFeed);
  };
  const DeleteFeed = (id) => {
    setUserId(id);
    setModalDeleteFeed(!modalDeleteFeed);
  };

  const UpdateFeedVideo = async () => {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("file_location", file);
    formData.append("thumb", thumbFile);
    formData.append("name", name);
    formData.append("info", info);
    if (!file || !userId) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/feedback", formData, {
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
        setErrMsg(
          "Fail to Update Feedback! Please Reload Add UpdateFeed Again"
        );
      }

      window.location.reload(true);
    } catch (err) {}
  };
  const UploadFeedVideo = async () => {
    const formData = new FormData();
    formData.append("file_location", file);
    formData.append("thumb", thumbFile);
    formData.append("info", info);
    formData.append("name", name);
    if (!file || !name) {
      setErrMsg("Please Insert Video URL or Name");
      return;
    }
    try {
      const response = await axiosPrivate.post("/feedback", formData, {
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
        setErrMsg(
          "Fail to Update Feedback! Please Reload Add UpdateFeed Again"
        );
      }

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteFeed = async (userId) => {
    try {
      axiosPrivate.delete(
        "/feedback",
        { data: JSON.stringify({ id: userId }) },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.reload(true);
    } catch (err) {}
  };

  useEffect(() => {
    axiosPrivate
      .get("/feedback")
      .then((res) => {
        setFeedBack(res.data);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  return (
    <>
      <div className="videoGallery__container">
        <h2> Feedback Components</h2>
        <div className="videoGallery__wrapper">
          <button
            className="raise"
            id="uploadfeed"
            onClick={() => UploadFeed()}
          >
            Upload
          </button>
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Video ID</th>
                <th>Update Feedback</th>
                <th>Delete Feedback</th>
              </tr>
            </thead>

            {FeedBack?.length ? (
              <tbody>
                {FeedBack.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => ToggleFeed(item.file_location)}>
                      <Link>{item.name}</Link>
                    </td>
                    <td>{item._id}</td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => UpdateFeed(item._id)}
                      >
                        Update Feedback
                      </button>
                    </td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => DeleteFeed(item._id)}
                      >
                        Delete Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>No FeedBack to display</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Modal show={modalFeed} close={ToggleFeed} title="FeedBack">
        <div class="video-container">
          <iframe
            className="responsive-iframe"
            src={FeedFile}
            allow="autoplay"
            title="cards"
          ></iframe>
        </div>
      </Modal>
      <Modal show={modalUpdateFeed} close={UpdateFeed} title="Update Feedback">
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
        <p>Info</p>
        <input
          type="text"
          placeholder="Info"
          id="name"
          onChange={(e) => setInfo(e.target.value)}
          className="pwd_input"
          required
        />
        <p>Insert Video URL</p>
        <input
          type="text"
          placeholder="Video Url"
          id="name"
          className="pwd_input"
          required
          onChange={(e) => setFile(e.target.value)}
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
          onClick={() => UpdateFeedVideo(userId)}
        >
          Update
        </button>
        <div className="progress">
          <p>{progressBar}</p>
        </div>
      </Modal>
      <Modal show={modalUploadFeed} close={UploadFeed} title="Upload Feedback">
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
        <p>Info</p>
        <input
          type="text"
          placeholder="Info"
          id="name"
          onChange={(e) => setInfo(e.target.value)}
          className="pwd_input"
          required
        />

        <p>Insert Video URL</p>
        <input
          type="text"
          placeholder="Video Url"
          id="name"
          className="pwd_input"
          required
          onChange={(e) => setFile(e.target.value)}
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
        <button className="raise" id="raise" onClick={() => UploadFeedVideo()}>
          Upload
        </button>
        <div className="progress">
          <p>{progressBar}</p>
        </div>
      </Modal>
      <Modal show={modalDeleteFeed} close={DeleteFeed} title="Delete Feedback">
        <button
          className="raise"
          id="raise"
          onClick={() => handleDeleteFeed(userId)}
        >
          delete
        </button>
      </Modal>
    </>
  );
};

export default VideoCollection;
