import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import UsersFunc from "../components/Search/UsersFunc.jsx"
import SearchBar from "../components/Search/SearchBar.jsx"


export default function SearchResult(props) {

  // uncomment this function once appropriate props is passed in
  // const [searchQuery, useSearchQuery] = useState(props)

  //using as default for testing purposes
  const [searchQuery, useSearchQuery] = useState('Halo');
  const [result, useResult] = useState(['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7']);

  useEffect(() => {
    console.log('inside useEffect')
    function searchQuery() {
      console.log('inside func')
      // axios.get('https://api.rawg.io/api/games?key=2539b6cc34574d38b6b056fc7477e16b')
      // .then((response) => {
      //   console.log('inside response')
      //   useSearchQuery(response)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
    return searchQuery()

  })

  function showResults(input) {
    let count = 0;
    let rows = [];
    for (var i = 0; i < input.length; i+=5) {
      rows.push([<tr key={i}><td key={i}>{input[i + 1]}</td><td key={i + 2}>{input[i + 1]}</td><td key={i + 3}>{input[i + 2]}</td><td key={i+ 4}>{input[i + 3]}</td><td key={i + 5}>{input[i + 4]}</td></tr>])
    }
    return rows;
  }

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
    position: "fixed",
    left: "50%",
    transform: "translate(-50%, -50%)"
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
        <table style={resultStyle}><tbody>{showResults(result)}</tbody></table>
      </div>
    </>
  );

}