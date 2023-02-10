import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';


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
    <div id="heart-div">
      {liked ? (
        <div class="click-to-like">
          <Typography spacing={2}>Click to Unlike the Game </Typography>
          <FavoriteIcon onClick={handleClick}/>
        </div>
      ) : (
        <div class="click-to-like">
          <Typography spacing={2}>Click to like the Game </Typography>
          <FavoriteBorderIcon onClick={handleClick}/>
        </div>

      )}
    </div>
  )

}