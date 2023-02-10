import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import './pages.css';
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Carousel from "../components/Carousel/Carousel.jsx"
// import muiNav from "../components/Navigation And Authentication/muiNav.jsx";
export default function Home(props) {
  return(
    <>
      {/* <Navigation />
      <muiNav /> */}
      {/* <Navigation /> */}
      <muiNav />
      <div>
      <div className="car-div">{props['types']?.map((t) => (
        <Carousel type={t} fav={props.data} />
      ))}</div>
      </div>
    </>
  );

}