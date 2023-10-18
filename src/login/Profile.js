import React, { useContext, useState } from "react";
import "./styles/Profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../components/provider/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const {logout} = useUser();
  const { isUserLoggedIn } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleSignOut() {
    logout();
  }

  return (
    <li
      className="profile"
      onClick={() => {
        setShowModal((curr) => !curr);
      }}
    >
      <div className="logo-profile">
        <AccountCircleIcon />
      </div>
      {showModal && (
        <section className="authenticate-modal">
          {isUserLoggedIn ? (
            <button className="sign-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="sign-btn" onClick={() => navigate("/signin")}>
              sign In
            </button>
          )}
        </section>
      )}
    </li>
  );
}
