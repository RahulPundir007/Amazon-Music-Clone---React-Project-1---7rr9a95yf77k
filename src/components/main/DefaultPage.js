import React from "react";
import "./styles/DefaultPage.css";
import { NavLink } from "react-router-dom";

export default function DefaultPage(){
    return (
        <div className="DefaultPage">
            <p className="mainline">We were unable to find the page you were looking for.</p>
            <p className="subline">Please return to the <NavLink to="/">Amazon Music homepage</NavLink></p>
            <img src="https://img.freepik.com/premium-vector/one-line-headphones-continuous-drawing-music-gadget-note-audio-headphone-outline-sketch-lineart-vector-concept-musical-symbol-illustration-headphone-drawing-contour-monoline_102902-3617.jpg" alt="broken-page"/>
            <img className="amazonlogo" src="https://robots.net/wp-content/uploads/2020/02/Amazon-Music-1024x576.png" alt="Amazon-Logo"/>
        </div>
    );
}