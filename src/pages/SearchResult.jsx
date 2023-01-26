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

  function showResults(input) {
    let count = 0;
    let rows = [];
    for (var i = 0; i < input.length; i+=5) {
      rows.push([<tr key={i}><td key={i}>{input[i + 1]}</td><td key={i + 2}>{input[i + 1]}</td><td key={i + 3}>{input[i + 2]}</td><td key={i+ 4}>{input[i + 3]}</td><td key={i + 5}>{input[i + 4]}</td></tr>])
    }
    return rows;
  }

  return(
    <>
      <Navigation />
      <SearchBar/>
      <div> {/*Filters List*/}
        <button type="button" onClick={UsersFunc} value={searchQuery} >User</button> <button type="button">Platform</button> <button type="button">Genre</button> <br/>
        <button type="button">Friends</button> <button type="button">Platofrm</button> <button type="button">Online</button>
      </div>
      <div> {/*Search Results */}
        <table><tbody>{showResults(result)}</tbody></table>
      </div>
    </>
  );

}