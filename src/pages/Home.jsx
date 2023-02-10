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
  const [imgs, setImgs] = useState([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => (v + 1) % 19);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return(
    <>
      {/* <Navigation /> */}
      {/* <muiNav /> */}
      <div class="homepage" style={{"background": "linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), url(" + (imgs.length === 0 ? null : imgs[value]) + ")"}}>
      <div className="car-div">{props['types']?.map((t) => (
        <Carousel type={t} fav={props.data} setImgs={setImgs}/>
      ))}</div>
      </div>
    </>
  );

}