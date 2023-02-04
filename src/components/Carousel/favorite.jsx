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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };



  useEffect(() => {
    console.log(props, " favProp")
    axios.get(`https://api.rawg.io/api/games/${props.fa.game_id}`, {
        params: {
          key: '61f56f92cd35421a90a7b9ff9f3a1583'
        }
      })
        .then((response) => {

          setFavorite(response.data)
        })
        .catch(error => {
          console.log(error);
        });}, [props.fa])

if(favorite.length > 0) {
return (

  <Slider {...settings}>

  {favorite.map((item) => (
    <div key={item.id} gameid={item.slug}className="card" onClick={(e) => handleClick(e.target.getAttribute('gameid'))}>
      {console.log('favorite', item)}
      <div gameid={item.slug} className="card-top">
        <img gameid={item.slug}
          src={
            defaultImage[item.name] === item.name
              ? defaultImage.linkDefault
              : item.background_image
          }
          alt={item.title}
          onError={handleErrorImage}
        />
        <h1 gameid={item.slug}>{item.name}</h1>
      </div>
      <div gameid={item.slug} className="card-bottom">
        {/* <h3>{item.name}</h3> */}
        <span gameid={item.slug}className="category">{}</span>
      </div>
    </div>
  ))}
</Slider>

)
        } else {
          return <div>Loading...</div>
        }




}


export default Fa