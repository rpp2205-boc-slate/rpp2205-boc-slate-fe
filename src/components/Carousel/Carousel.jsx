import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './C.css';
import './F.css';
import { dataDigitalBestSeller } from './data';
import imgTest from './Testing/1.png';
import axios from 'axios';
import Fri from './friends.jsx';
import Gam from './game.jsx';
import Fa from './favorite.jsx';

function Carousel(props) {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState({});
  const [friends, setFriends] = useState([])
  const [fav, setFav] = useState([])
  const [games, setGames] = useState([])
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
    if (props.type === "Popular") {
      axios.get('games/orderBy/rating')
        .then((response) => {
          setGames(response.data)
          var imgs = response.data.map(game => game.background_image);
          props.setImgs(imgs);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (props.type === 'Friends' && props.fav) {
        setFriends(props.fav.friends)
    } else if (props.type === "Favorite" && props.fav) {
      setFav(props.fav.fav_games)
    } else if (props.type ==='Games' && props.fav) {
      axios.get(`https://api.rawg.io/api/games/${props.fav.id}/game-series`, {
        params: {
          key: '61f56f92cd35421a90a7b9ff9f3a1583'
        }
      })
      .then((response) => {
        setGames(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
    } else if (props.type ==='DLC' && props.fav) {
      axios.get(`https://api.rawg.io/api/games/${props.fav.id}/additions`, {
        params: {
          key: '61f56f92cd35421a90a7b9ff9f3a1583'
        }
      })
      .then((response) => {
        setGames(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
    } else if (props.type === "New") {
      axios.get('games/orderBy/released')
        .then((response) => {
          setGames(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    } else if (props.type === "Top Rated") {
      axios.get('games/orderBy/metacritic')
        .then((response) => {
          setGames(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [props.type, props.fav]);


  const handleClick = (input) => {
    if (props.type !== "Friends") {
    window.location.href = `/gameprofile/${input}`;
    } else {
      window.location.href = `/userprofile/${input}`
    }
  }

  if(games && games.length > 0) {
  return (
    <div className="Car"> {props.type}
      <Slider {...settings} >
      {games.map((game) => {
  if (game.background_image) {
    return (
      <div style={{background: "black"}} key={game.id} gameid={game.slug} className="card" onClick={(e) => handleClick(e.target.getAttribute('gameid'))}>
        <Gam clickFun={handleClick} g={game} error={handleErrorImage} />
      </div>
    );
  }
  return null;
})}


      </Slider>
    </div>
  );
              } else if (props.type === 'Friends' && friends && friends.length > 0) {
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
              } else if (props.type === 'Favorite' && fav && fav.length > 0) {
                return (
                 <div className='Car'>Favorites
                 <Slider {...settings}>
                    {fav.map((fa) => (
                      <Fa  clickFun={handleClick} fa={fa} />
                    ))}
                    </Slider>
                  </div>
                )
              } else {
                return
              }
            }
//testing
export default Carousel