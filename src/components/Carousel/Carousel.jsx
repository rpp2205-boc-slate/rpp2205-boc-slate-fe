import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './C.css';
import './F.css';
import { dataDigitalBestSeller } from './data';
import imgTest from './Testing/1.png';
import axios from 'axios'
import Fri from './friends.jsx'

function Carousel(props) {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState({});
  const [friends, setFriends] = useState([])
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
      axios.get('https://api.rawg.io/api/games', {
        params: {
          ordering: '-rating',
          key: '61f56f92cd35421a90a7b9ff9f3a1583'
        }
      })
        .then((response) => {
          console.log(response.data.results)
          setData(response.data.results)
        })
        .catch(error => {
          console.log(error);
        });
    } else if (props.type === 'Fri') {
      console.log('TESSSSTING')
      axios.get('/user/:user_id/profile', {params: { user_id: 2}})
      .then((response) => {
        console.log(response.data.friends, " CarFriend")
        setFriends(response.data.friends)

      })
      .catch((error) => {
        console.log('Error ', error)
      })
    }
  }, [props.type]);


  const handleClick = (input) => {
    if (props.type !== "Friend") {
    window.location.href = `/gameprofile/${input}`;
    } else {
      window.location.href = `/userprofile/${input}`
    }
  }


  if(props.type === "Pop" && Object.keys(data).length !== 0) {
  return (
    <div className="Car"> Popular
      <Slider {...settings}>
        {dataDigitalBestSeller.map((item) => (
          <div key={item.id} gameid={item.slug}className="card" onClick={(e) => handleClick(e.target.getAttribute('gameid'))}>
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
    </div>
  );
              } else if (props.type === 'Fri' && friends.length > 0) {
                  return (
                   <div className='fCar'>Friends
                   <Slider {...settings}>
                      {friends.map((friend) => (
                        // <div onClick={(e) => handleClick(`/user/${friend.userid}/profile`)}>{friend.userid}</div>
                        <Fri clickFun={handleClick} f={friend} />
                      ))}
                      </Slider>
                    </div>
                  )
              } else {
                return <div onClick={(e) => handleClick('Testing')}>NOT</div>
              }
            }
//testing
export default Carousel