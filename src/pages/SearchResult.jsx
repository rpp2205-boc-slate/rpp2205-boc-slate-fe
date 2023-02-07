import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import UsersFunc from "../components/Search/UsersFunc.jsx";
import SearchBar from "../components/Search/SearchBar.jsx";
import ShowResults from "../components/Search/ShowResults.jsx";
import { dataDigitalBestSeller } from '../components/Carousel/data';
import imgTest from '../components/Carousel/Testing/1.png';
import './C.css'

/*
checkout /components/Search for list of functions used
*/

export default function SearchResult(props) {

  // const [result, useResult] = useState(props.query);
  const [defaultImage, setDefaultImage] = useState({});
  const query = useParams();
  const [result, setResult] = useState([]);
  const [gameResult, setGameResult] = useState([]);
  const [userResult, setUserResult] = useState([])
  const [genre, setGenre] = useState([]);
  const [cons, setCons] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedConsole, setSelectedConsole] = useState('');
  const [clickUser, setClickUser] = useState(false);
  const nav = useNavigate()

  useEffect(() => {
    // get list of genres
    setGameResult([]);
    setUserResult([]);

    axios.get(`/genre`)
    .then((response) => {
      setGenre(response.data.results)
    })
    .catch((err)=> {
      console.log(err, 'error in getting genre')
    })
    axios.get(`/platforms`)
    .then((response) => {
      console.log(response.data.results)
      setCons(response.data.results)
    })
    .catch((err)=> {
      console.log(err, 'error in getting genre')
    })


      // if theres a query being searched, then search that query
    if (query.params) {
      // if (clickUser) {
        axios.get(`/users/${query.params}`)
        .then((response) => {
          let formatResult = [];
          response.data.users.forEach((item) => {
            let x = {
              id: item.user_id,
              name: item.username,
              slug: item.username,
              person: true,
              background_image: item.photos[0].photo_url
            }
            formatResult.push(x)
          })
          setUserResult(formatResult)
        })
        .catch((err)=> {
          console.log(err, 'error in getting genre')
        })
      // }
        axios.get(`/games/keyword/${query.params}/1`)
        .then((response0) => {
          axios.get(`/games/keyword/${query.params}/2`)
          .then((response1) => {
            axios.get(`/games/keyword/${query.params}/3`)
            .then((response2) => {
              let firstArr = response0.data;
              let secondArr = firstArr.concat(response1.data);
              let thirdArr = secondArr.concat(response2.data)
              setGameResult(thirdArr)
              // console.log(thirdArr, 'ken')
            })
            .catch((err)=> {
              console.log(err, 'error in getting games response 2')
            })
          })
          .catch((err)=> {
            console.log(err, 'error in getting games response 1')
          })
        })
        .catch((err)=> {
          console.log(err, 'error in getting games response 0')
        })
    } else {
      // if no query is being searched, search most popular
      axios.get(`/games/orderBy/${'rating'}`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((err)=> {
        console.log(err, 'error in getting results')
      })
    }
  }, [query.params])

  useEffect(() => {
    let internalResult = [];
    if (gameResult.length > userResult.length && gameResult.length > 0 && userResult.length > 0) {
      for (var i = 0; i < gameResult.length; i++) {
        if (gameResult[i]) {
          internalResult.push(gameResult[i]);
        }
        if (userResult[i]) {
          internalResult.push(userResult[i])
        }
      }
    } else {
      for (var i = 0; i < userResult.length; i++) {
        if (gameResult[i]) {
          internalResult.push(gameResult[i]);
        }
        if (userResult[i]) {
          internalResult.push(userResult[i])
        }
      }
    }
    if (gameResult.length === 0) {
      internalResult = userResult;
    } else if (userResult.length == 0) {
      internalResult = gameResult;
    }
    setResult(internalResult)
  }, [gameResult])

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };

  const handleClick = (input, input2) => {
    if (input2) {
      window.location.href = `/userprofile/${input}`;
    } else {
      window.location.href = `/gameprofile/${input}`
    }
  }

  const genreClick = (e) => {
    setSelectedGenre(e.target.value)
    axios.get(`/games/genre/${e.target.value}`)
      .then((response) => {
        setResult(response.data.results)
      })
      .catch((err)=> {
        console.log(err, 'error genreClick')
      })
  }

  const consoleClick = (e) => {
    setSelectedConsole(e.target.value)
    // console.log(e.target.value, 'ken')
    axios.get(`/games/platform/${e.target.value}`)
      .then((response) => {
        setResult(response.data.results)
      })
      .catch((err)=> {
        console.log(err, 'error inside consoleClick')
      })
  }

  const userClick = (e) => {
    setResult(userResult)
  }

  const gameClick = (e) => {
    setResult(gameResult)
  }



  return(
    <div className="main">
      <div className="filterList"> {/*Filters List*/}
        <button type="button" onClick={userClick}>Users</button> <button type="button" onClick={gameClick}>Games</button><br/>
       <label for="cars">Choose a Genre:</label>
        <select className="list" value={selectedGenre} onChange={genreClick}>
          {genre.map((item) => (
            <option value={item.name} key={item.id}>{item.name}</option>
          ))}
        </select>
        <label>Choose a Console:</label>
        <select className="list" value={selectedConsole} onChange={consoleClick}>
          {cons.map((item) => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="searchBackground"> {/*Search Results */}
        <h3 >Results</h3>
        <div>
          <div className='holder'>
            {result.map((item) => (
            <div key={item.id} className="card" onClick={(e) => handleClick(item.slug, item.person)}>
            <div className="card-top">
              <img
                src={
                  defaultImage[item.name] === item.name
                    ? defaultImage.linkDefault
                    : item.background_image
                }
                onError={handleErrorImage}
              />
              <h1 gameid={item.id}>{item.name}</h1>
            </div>
            <div gameid={item.id} className="card-bottom">
            </div>
          </div>
          ))}
          </div>
          </div>
      </div>
    </div>
  );

}