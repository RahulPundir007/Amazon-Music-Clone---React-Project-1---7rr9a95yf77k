import React, { useState } from "react";
import "./styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/provider/UserProvider";

export default function Register() {
  const navigate = useNavigate();
  const { signUp, loggedInUserHandler } = useUser();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function register() {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          projectID: "j3akjazjoyky",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userInfo,
          appType: "music",
        }),
      }
    );

    if (response.ok) {
      const jsondata = await response.json();
      const {
        token,
        data: { user },
      } = jsondata;
      
      signUp(token);
      loggedInUserHandler(user);
      navigate("/")
    } else {
      console.log(response)
      alert("Invalid Credentials");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    register();
  }

  return (
    <div className="create-main-container">
      <div className="create-container">
        <div className="create-div">
          <form onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <div className="your-name-div">
              <div className="your-name-lable-div">
                <label htmlFor="name">Your name</label>
              </div>
              <div className="your-name-input-div">
                <input
                  type="text"
                  placeholder="First and last name"
                  name="name"
                  id="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="your-name-div">
              <div className="email-lable-div">
                <label htmlFor="email">Email</label>
              </div>
              <div className="email-input-div">
                <input
                  type="text"
                  placeholder=""
                  name="email"
                  id="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="password-div">
              <div className="password-lable-div">
                <label htmlFor="password">Password</label>
              </div>
              <div className="password-input-div">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={userInfo.password}
                  onChange={handleChange}
                />
              </div>
              <p className="italic">Passwords must be at least 6 characters.</p>
            </div>

            <div className="signin-button-div">
              <button className="signin-button">
                Create your Amazon account
              </button>
            </div>
            <h5 className="legal-check-box">
              By creating an account or logging in, you agree to Amazon’s{" "}
              <a href="/">Conditions of Use</a> and{" "}
              <a href="/">Privacy Policy</a>.
            </h5>
            <div className="signin-button-div">
              <p className="already-have-account">Already have an account?</p>
            </div>
            <button className="sign-button" onClick={() => navigate("/signin")}>
              Signin Here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
