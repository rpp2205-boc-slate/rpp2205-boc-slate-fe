import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './C.css';
import imgTest from './Testing/1.png';
import axios from 'axios'


function Fa (props) {
  const [favorite, setFavorite] = useState({});
  const [defaultImage, setDefaultImage] = useState({});

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };
  const handleClick = (input) => {
    console.log(props.type)
    if (props.type !== "Friends") {
    window.location.href = `/gameprofile/${input}`;
    } else {
      window.location.href = `/userprofile/${input}`
    }
  }


  useEffect(() => {
    var id;
    if(Number(props.fa.game_id) > 0) {
      id = Number(props.fa.game_id)
    } else {
      id=props.fa.game_id
    }

    axios.get(`/games/slug/${id}`)
        .then((response) => {
          setFavorite(response.data)
        })
        .catch(error => {
          console.log(error);
        });}, [props])



if(Object.keys(favorite).length > 0) {
return (
    <div key={favorite.id} gameid={favorite.slug}className="card" onClick={(e) => handleClick(e.target.getAttribute('gameid'))}>
      <div gameid={favorite.slug} className="card-top">
        <img gameid={favorite.slug}
          src={
            defaultImage[favorite.name] === favorite.name
              ? defaultImage.linkDefault
              : favorite.background_image
          }
          alt={favorite.title}
          onError={handleErrorImage}
        />
        <h1 gameid={favorite.slug}>{favorite.name}</h1>
      </div>
      <div gameid={favorite.slug} className="card-bottom">
        {/* <h3>{item.name}</h3> */}
        <span gameid={favorite.slug}className="category">{}</span>
      </div>
    </div>

)
        } else {
          return <div>404 Not Found</div>
        }




}


export default Fa