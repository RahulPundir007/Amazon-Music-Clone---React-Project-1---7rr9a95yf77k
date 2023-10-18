import React from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./main/Home";
import Podcast from "./main/Podcast";
import Library from "./main/Library";
import Signin from "../login/Signin";
import Register from "../login/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./provider/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useUser();
  if (!isUserLoggedIn) {
    return <Navigate to="/signin" />;
    console.log(isUserLoggedIn);
  }

  return children;
};

const App = () => {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
