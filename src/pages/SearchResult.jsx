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
  const nav = useNavigate()

  useEffect(() => {
    if (query.params) {
      axios.get(`/games/keyword/${query.params}/0`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((err)=> {
        console.log(err, 'error in getting results')
      })
    } else {
      axios.get(`/games/orderBy/${'rating'}`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((err)=> {
        console.log(err, 'error in getting results')
      })
    }
  }, [query.params])

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };

  const handleClick = (input) => {
    if (props.type !== "Friend") {
    window.location.href = `/gameprofile/${input}`;
    } else {
      window.location.href = `/userprofile/${input}`
    }
  }


  return(
    <div className="main">
      <div className="filterList"> {/*Filters List*/}
        <button type="button" >Users</button> <button type="button">Platform</button><br/>
       <label for="cars">Choose a Genre:</label>
      <select name="cars" id="cars">
        <option value="volvo">RPG</option>
        <option value="saab">MMORPG</option>
        <option value="mercedes">Adventure</option>
        <option value="audi">Strategy</option>
      </select>
      </div>
      <div className="searchBackground"> {/*Search Results */}
        <h3 >Results</h3>
        <div>
          <div className='holder'>
            {result.map((item) => (
            <div key={item.id} gameid={item.id}className="card" onClick={(e) => handleClick(e.target.getAttribute('gameid'))}>
            <div gameid={item.id} className="card-top">
              <img gameid={item.id}
                src={
                  defaultImage[item.name] === item.name
                    ? defaultImage.linkDefault
                    : item.background_image
                }
                alt={item.title}
                onError={handleErrorImage}
              />
              <h1 gameid={item.id}>{item.name}</h1>
            </div>
            <div gameid={item.id} className="card-bottom">
              {/* <h3>{item.name}</h3> */}
              <span gameid={item.id}className="category">{}</span>
            </div>
          </div>
          ))}
          </div>
          </div>
      </div>
    </div>
  );

}