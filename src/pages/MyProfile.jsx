import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import Carousel from '../components/Carousel/Carousel.jsx';

export default function MyProfile(props) {

  const defaultData = {"fav_games": [
    {
      "game_id": "halo"
    }]}
  const types = ['Fav', 'Fri']

  return(
    <div className="profile">
      <Navigation />
      <Profile />
      {console.log("CHANGES")}
      {types.map((t) => (
        <Carousel type={t} fav={defaultData}/>
      ))}
    </div>
  );

}