import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';



export default function AddToLikeButton(props) {
  var selfId = props.selfId;
  var slug = props.slug;
  var favGames = props.selfProfile?.fav_games;
  const [liked, setLiked] = useState(favGames.find(element => element.game_id === slug) !== undefined);
  var handleClick = () => {
    axios.post(`/game/${selfId}/${slug}`, {"liked": !liked})
      .then(response => {
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
          <Tooltip title="Unlike this game">
            <FavoriteIcon onClick={handleClick} fontSize="large" sx={{ color: (props.mode ? "cornflowerblue" : '#1b2838')}}/>
          </Tooltip>

        </div>
      ) : (
        <div class="click-to-like">
          <Tooltip title="Click to like this game!">
            <FavoriteBorderIcon onClick={handleClick} fontSize="large" sx={{ color: (props.mode ? "cornflowerblue" : '1b2838')}}/>
          </Tooltip>
        </div>

      )}
    </div>
  )

}