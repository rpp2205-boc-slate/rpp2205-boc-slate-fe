import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './C.css';
import { dataDigitalBestSeller } from './data';
import imgTest from './Testing/1.png';
import axios from 'axios'

function Carousel(props) {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState({});
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
    if (props.type === "Pop") {
      console.log(" MAking Request")
      axios.get('https://api.rawg.io/api/games', {
        params: {
          ordering: '-rating',
          key: 'APIKey'
        }
      })
        .then((response) => {
          setData(response.data.results)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [props.type]);


  const handleClick = () => {
    window.location.href = `/gameprofile/${data.id}`;
  }


  if(props.type === "Pop" && Object.keys(data).length !== 0) {
  return (
    <div className="Car"> Popular
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} gameID={item.id}className="card" onClick={(e) => console.log(e.target.gamid, ' Clicked')}>
            <div gameID={item.id} className="card-top">
              <img gameID={item.id}
                src={
                  defaultImage[item.name] === item.name
                    ? defaultImage.linkDefault
                    : item.background_image
                }
                alt={item.title}
                onError={handleErrorImage}
              />
              <h1 gameID={item.id}>{item.name}</h1>
            </div>
            <div gameID={item.id} className="card-bottom">
              {/* <h3>{item.name}</h3> */}
              <span gameID={item.id}className="category">{}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
              } else {
                return <div>NOT</div>
              }
            }
//testing
export default Carousel