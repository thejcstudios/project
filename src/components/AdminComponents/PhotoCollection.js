import React, { useEffect, useState } from "react";
import "./css/VideoGallery.css";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const VideoCollection = () => {
  const BASE_URL = "http://localhost:5000/";
  const [photos, setPhotos] = useState();
  const [photoFile, setphotoFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [modalPhoto, setModalPhoto] = useState(false);
  const [userId, setUserId] = useState();
  const [modalUpdatePhoto, setModalUpdatePhoto] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [file, setFile] = useState([]);
  const [name, setName] = useState();
  const [progressBar, setProgressBar] = useState();

  const TogglePhoto = (location) => {
    setphotoFile(location);
    setModalPhoto(!modalPhoto);
  };

  const UpdatePhoto = (id) => {
    setUserId(id);
    setModalUpdatePhoto(!modalUpdatePhoto);
  };

  const updatePhotoVideo = async () => {
    const formData = new FormData();
    formData.append("photo__gallery", file);
    formData.append("name", name);
    formData.append("id", userId);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/photo", formData, {
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
        setErrMsg("Fail to Update Photo! Please Reload Add UpdatePhoto Again");
      }

      window.location.reload(true);
    } catch (err) {}
  };

  useEffect(() => {
    axiosPrivate
      .get("/photo")
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  return (
    <>
      <div className="videoGallery__container">
        <h2> Image Components</h2>
        <div className="videoGallery__wrapper">
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image ID</th>
                <th>Update Image</th>
              </tr>
            </thead>

            {photos?.length ? (
              <tbody>
                {photos.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => TogglePhoto(item.file_location)}>
                      <Link>{item.name}</Link>
                    </td>
                    <td>{item._id}</td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => UpdatePhoto(item._id)}
                      >
                        Update Image
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>No Photos to display</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Modal show={modalPhoto} close={TogglePhoto} title="photos">
        <img src={BASE_URL + photoFile} alt="img" />
      </Modal>
      <Modal show={modalUpdatePhoto} close={UpdatePhoto} title="Update Photo">
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
        <input
          type="file"
          placeholder="Name"
          id="file"
          className="file__input"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="raise"
          id="raise"
          onClick={() => updatePhotoVideo(userId)}
        >
          Update Image
        </button>
        <div className="progress">
          <p>{progressBar}</p>
        </div>
      </Modal>
    </>
  );
};

export default VideoCollection;
