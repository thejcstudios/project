import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminLogin.css";
import Axios from "../../api/axios";
const LOGIN_URL = "/auth";

const AdminLogin = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/videogallery";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="main__login">
          <div className="container">
            <center>
              <div className="middle">
                <div id="login">
                  <form onSubmit={handleSubmit}>
                    <fieldset className="clearfix">
                      <p>
                        <span className="fa fa-user"></span>
                        <input
                          type="text"
                          id="username"
                          placeholder="Username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                        />
                      </p>
                      <p>
                        <span className="fa fa-lock"></span>
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                        />
                      </p>

                      <div>
                        <button className="raise">Sign In</button>
                      </div>
                      <div className="peristChech">
                        <input
                          type="checkbox"
                          id="persist"
                          onChange={togglePersist}
                          checked={persist}
                        />
                      </div>
                    </fieldset>
                    <div className="clearfix"></div>
                  </form>

                  <div className="clearfix"></div>
                </div>
                <div className="logo">
                  <img src="/images/logo1.png" alt="logo" />
                </div>
              </div>
            </center>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
