import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function AddToLikeButton(props) {
  var selfId = props.selfId;
  var slug = props.slug;
  var favGames = props.selfProfile?.fav_games;
  const [liked, setLiked] = useState(favGames.find(element => element.game_id === slug) !== undefined);
  var handleClick = () => {
    axios.post(`/game/${selfId}/${slug}`, {"liked": !liked})
      .then(response => {
        console.log(response.data);
        setLiked(!liked);
      })
      .catch(err => {
        console.error(err);
      })
  }
  return (
    <div>
      <button onClick={handleClick}>{liked ? "Unlike this Game" : "Click to Like this Game!"}</button>
    </div>
  )

}