import React, { useState } from "react";
import "./styles/Signin.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/provider/UserProvider";

const Project_ID = "j3akjazjoyky";

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useUser();

  const navigate = useNavigate();

  function handleChangeFunc(e) {
    const {name, value} = e.target;
    setUserInfo({...userInfo, [name]: value})
    
    // const key = e.target.name;
    // const value = e.target.value;
    // setUserInfo({ ...userInfo, [key]: value });
  }

  async function signinHandler(userInfo) {
    const loginResponse = await fetch(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        method: "POST",
        headers: {
          projectId: Project_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userInfo,
          appType: "music",
        }),
      }
    );
    if (loginResponse.ok) {
      const data = await loginResponse.json();
      console.log(data);
      signIn(data.token);
      navigate("/");
    } else {
      alert("invalid credentials");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    signinHandler(userInfo);
  }

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-div">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className="email-div">
              <div className="email-lable-div">
                <label>Email or mobile phone number</label>
              </div>
              <div className="email-input-div">
                <input
                  type="text"
                  name="email"
                  placeholder="e-mail"
                  value={userInfo.email}
                  onChange={handleChangeFunc}
                />
              </div>
            </div>
            <div className="password-div">
              <div className="password-lable-div">
                <label>Password</label>
              </div>
              <div className="password-input-div">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={userInfo.password}
                  onChange={handleChangeFunc}
                />
              </div>
            </div>
            <div className="signin-button-div">
              <button className="signin-button">Sign in</button>
            </div>
            <h5 className="legal-check-box">
              By continuing, you agree to Amazon's{" "}
              <a href="/">Conditions of Use</a> and{" "}
              <a href="/">Privacy Notice</a>.
            </h5>
            <div className="keep-me-signedin-div">
              <input type="checkbox" />
              <span>
                {" "}
                Keep me signed in. <a href="/">Details</a>{" "}
              </span>
            </div>
          </form>
          <div className="new-to-amazon">
            <p>New to Amazon?</p>
          </div>
          <div className="create-account-button-div">
            <button
              className="create-account-button"
              id="login-page"
              onClick={() => navigate("/register")}
            >
              Create your Amazon account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
