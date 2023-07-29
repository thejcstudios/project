import React, { useEffect, useState } from "react";
import "./css/VideoGallery.css";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const ImageGallery = () => {
  const BASE_URL = "https://jcstudios-api.onrender.com/";
  const [photos, setPhotos] = useState();
  const [photoFile, setphotoFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [modalPhoto, setModalPhoto] = useState(false);
  const [userId, setUserId] = useState();
  const [modalUpdatePhoto, setModalUpdatePhoto] = useState(false);
  const [modalDeleteFeed, setModalDeleteFeed] = useState(false);
  const [modalUploadFeed, setModalUploadFeed] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [file, setFile] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [progressBar, setProgressBar] = useState();

  const TogglePhoto = (location) => {
    setphotoFile(location);
    setModalPhoto(!modalPhoto);
  };
  const UploadFeed = () => {
    setModalUploadFeed(!modalUploadFeed);
  };

  const UpdatePhoto = (id) => {
    setUserId(id);
    setModalUpdatePhoto(!modalUpdatePhoto);
  };
  const DeleteFeed = (id) => {
    setUserId(id);
    setModalDeleteFeed(!modalDeleteFeed);
  };

  const handleDeleteFeed = async (userId) => {
    try {
      axiosPrivate.delete(
        "/photogallery",
        { data: JSON.stringify({ id: userId }) },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.reload(true);
    } catch (err) {}
  };

  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("category", category);
    if (!file || !name) {
      setErrMsg("Please Insert Video or Name");
      return;
    }
    try {
      const response = await axiosPrivate.post("/photogallery", formData, {
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

  const updatePhotoVideo = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("id", userId);
    formData.append("category", category);
    if (!file || !name) {
      setErrMsg("Please Insert Image or Name");
      return;
    }
    try {
      const response = await axiosPrivate.put("/photogallery", formData, {
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
        setErrMsg("Fail to Update Image! Please Reload Add Update Again");
      }

      window.location.reload(true);
    } catch (err) {}
  };

  useEffect(() => {
    axiosPrivate
      .get("/photogallery")
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  return (
    <>
      <div className="videoGallery__container">
        <h2> Guest Image Gallery</h2>
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
                <th>Update Image</th>
                <th>Delete Image</th>
              </tr>
            </thead>

            {photos?.length ? (
              <tbody>
                {photos.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => TogglePhoto(item.file_location)}>
                      <Link>{item.name}</Link>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => UpdatePhoto(item._id)}
                      >
                        Update Image
                      </button>
                    </td>
                    <td>
                      <button
                        className="raise"
                        onClick={() => DeleteFeed(item._id)}
                      >
                        Delete Image
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
        <select
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Select">Select Category</option>
          <option value="Wedding">Wedding</option>
          <option value="Kids Event">Kids Event</option>
          <option value="Corporate">Corporate</option>
          <option value="Pageant">Pageant</option>
          <option value="Documentary">Documentary</option>
        </select>
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
      <Modal show={modalDeleteFeed} close={DeleteFeed} title="Delete Feedback">
        <button
          className="raise"
          id="raise"
          onClick={() => handleDeleteFeed(userId)}
        >
          delete
        </button>
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

        <p>Insert Image</p>
        <input
          type="file"
          placeholder="Name"
          id="file"
          className="file__input"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="raise" id="raise" onClick={() => UploadImage()}>
          Upload {category}
        </button>
        <div className="progress">
          <p>{progressBar}</p>
        </div>
      </Modal>
    </>
  );
};

export default ImageGallery;
