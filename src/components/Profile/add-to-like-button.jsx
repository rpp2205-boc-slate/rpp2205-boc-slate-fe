import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function AddToLikeButton(props) {
  var selfId = props.selfId;
  var slug = props.slug;
  var favGames = profileObj.fav_games;
  var handleClick = () => {


  }
  return (
    <div>
      <button>{favGames.includes(slug) ? "Unlike this Game" : "Click to Like this Game!"}</button>
    </div>
  )

}