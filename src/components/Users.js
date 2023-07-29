import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/userAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "./Users.css";
import "./Button2.scss";
import Modal from "./modal/Modal";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Users = () => {
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [uid, setUid] = useState();

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const Toggle = (userId) => {
    setUid(userId);
    setModal(!modal);
  };

  const ToggleDelete = (userId) => {
    setUid(userId);
    setModalDelete(!modalDelete);
  };

  const updateUser = async () => {
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axiosPrivate.put(
        "/users",
        JSON.stringify({ id: uid, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      window.location.reload(true);
    } catch (err) {}
  };

  const handleDeleteRow = async (userId) => {
    try {
      const response = await axiosPrivate.delete(
        "/users",
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
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        const userNames = response.data;
        console.log(response.data);
        isMounted && setUsers(userNames);
      } catch (err) {
        console.error(err);
        navigate("/admin", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  return (
    <div className="user__wrapper">
      <table id="customers">
        <thead>
          <tr>
            <th>Username</th>
            <th>Users ID</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        {users?.length ? (
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item._id}</td>
                <td>
                  <button className="raise" onClick={() => Toggle(item._id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="raise"
                    onClick={() => ToggleDelete(item._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>No users to display</td>
            </tr>
          </tbody>
        )}
      </table>
      <Modal show={modal} close={Toggle} title="Update Password">
        <p>
          <span className="fa fa-lock"></span>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            className="pwd_input"
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </p>
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <p>Password</p>
        <p>
          <span className="fa fa-lock"></span>
          <input
            type="password"
            placeholder="Re-type Password"
            id="retype_password"
            className="pwd_input"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </p>
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          Must match the first password input field.
        </p>
        <p>Re-type Password</p>
        <button
          type="submit"
          className="raise"
          id="raise"
          disabled={!validPwd || !validMatch ? true : false}
          onClick={() => updateUser(uid)}
        >
          Update
        </button>
      </Modal>
      <Modal show={modalDelete} close={ToggleDelete} title="Delete User?">
        <button
          className="raise"
          id="raise"
          onClick={() => handleDeleteRow(uid)}
        >
          delete
        </button>
      </Modal>
    </div>
  );
};

export default Users;
