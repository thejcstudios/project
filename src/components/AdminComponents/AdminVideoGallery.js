import React, { useEffect, useState } from "react";
import "./css/VideoGallery.css";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const AdminVideoGallery = () => {
  const [videos, setVideos] = useState();
  const [videoFile, setVideoFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalUploadFeed, setModalUploadFeed] = useState(false);
  const [modalDeleteFeed, setModalDeleteFeed] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [file, setFile] = useState();
  const [thumbFile, setThumbFile] = useState([]);
  const [name, setName] = useState();
  const [progressBar, setProgressBar] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState();

  const UploadFeed = () => {
    setModalUploadFeed(!modalUploadFeed);
  };

  const Toggle = (name) => {
    setVideoFile(name);
    setModal(!modal);
  };
  const DeleteFeed = (id) => {
    setUserId(id);
    setModalDeleteFeed(!modalDeleteFeed);
  };

  const Update = (id) => {
    setUserId(id);
    setModalUpdate(!modalUpdate);
  };
  const handleDeleteFeed = async (userId) => {
    try {
      axiosPrivate.delete(
        "/videogallery",
        { data: JSON.stringify({ id: userId }) },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.reload(true);
    } catch (err) {}
  };
  const updateVideo = async () => {
    const formData = new FormData();
    formData.append("file_location", file);
    formData.append("thumb", thumbFile);
    formData.append("name", name);
    formData.append("id", userId);
    formData.append("category", category);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/videogallery", formData, {
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
  const UploadVideoGallery = async () => {
    const formData = new FormData();
    formData.append("file_location", file);
    formData.append("thumb", thumbFile);
    formData.append("name", name);
    formData.append("category", category);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.post("/videogallery", formData, {
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVideos = async () => {
      try {
        const response = await axiosPrivate.get("/videogallery", {
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

  return (
    <>
      <div className="videoGallery__container">
        <h2> Guest Video Gallery</h2>
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
                <th>Category</th>
                <th>Update</th>
                <th>Delete</th>
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
                    <td>
                      <button
                        className="raise"
                        onClick={() => DeleteFeed(item._id)}
                      >
                        Delete
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
        <div class="video-container">
          <iframe
            className="responsive-iframe"
            src={videoFile}
            allow="autoplay; fullscreen;"
            title="cards"
          ></iframe>
        </div>
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
        <select
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Select">Select Category</option>
          <option value="Documentary">Documentary</option>
          <option value="Wedding">Wedding</option>
          <option value="Kids Event">Kids Event</option>
          <option value="Corporate">Corporate</option>
          <option value="Pageant">Pageant</option>
        </select>
        <p>Video URL</p>
        <input
          type="text"
          placeholder="File Location"
          id="name"
          onChange={(e) => setFile(e.target.value)}
          className="pwd_input"
          required
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
      <Modal show={modalUploadFeed} close={UploadFeed} title="Update Feedback">
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
        <select
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Select">Select Category</option>
          <option value="Documentary">Documentary</option>
          <option value="Wedding">Wedding</option>
          <option value="Kids Event">Kids Event</option>
          <option value="Corporate">Corporate</option>
          <option value="Pageant">Pageant</option>
        </select>
        <p>Video URL</p>
        <input
          type="text"
          placeholder="File Location"
          id="name"
          onChange={(e) => setFile(e.target.value)}
          className="pwd_input"
          required
        />

        <p>Insert Image</p>
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
          onClick={() => UploadVideoGallery()}
        >
          Upload {category}
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

export default AdminVideoGallery;
