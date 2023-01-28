import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import UsersFunc from "../components/Search/UsersFunc.jsx"
import SearchBar from "../components/Search/SearchBar.jsx"
import ShowResults from "../components/Search/ShowResults.jsx";
import { dataDigitalBestSeller } from '../components/Carousel/data';
import imgTest from '../components/Carousel/Testing/1.png';

/*
checkout /components/Search for list of functions used
*/

export default function SearchResult(props) {

  // uncomment this function once appropriate props is passed in
  // const [searchQuery, useSearchQuery] = useState(props)

  //using as default for testing purposes
  const [searchQuery, useSearchQuery] = useState('Halo');
  const [result, useResult] = useState(['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7']);
  const [defaultImage, setDefaultImage] = useState({});


  useEffect(() => {
    console.log(dataDigitalBestSeller)
    function searchQuery() {
      console.log('inside func')
      // useResult([dataDigitalBestSeller])
      // axios.get('https://api.rawg.io/api/games?key=2539b6cc34574d38b6b056fc7477e16b')
      // .then((response) => {
      //   console.log('inside response')
      //   useSearchQuery(response)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
    searchQuery();
  }, [])

 // /genres to get all the genres

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };

  let filtersBackground = {
    position: "fixed",
    border: "5px solid",
    left: "auto",
    padding: "10px",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }

  let resultBackground = {
    position: "fixed",
    color: "red",
    borderStyle: "solid",
    backgroundColor: "#A9A9A9",
    borderRadius: "20px",
    width: "100%",
    height: "700px",
    padding: "1%",
    top: "30%",

  }

  let resultStyle = {
    position: "relative",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "30%"
  }





  return(
    <>
      <div><Navigation /></div>
      <SearchBar/>
      <div style={filtersBackground}> {/*Filters List*/}
        <button type="button" onClick={UsersFunc} value={searchQuery} >User</button> <button type="button">Platform</button> <button type="button">Genre</button> <br/>
        <button type="button">Friends</button> <button type="button">Platofrm</button> <button type="button">Online</button>
      </div>
      <div style={resultBackground}> {/*Search Results */}
        <h3 style={{textAlign:"center", padding:"0px 0px 25px 0px"}}>Results</h3>
        <table style={resultStyle}><tbody>{ShowResults(result)}</tbody></table>
      </div>
    </>
  );

}