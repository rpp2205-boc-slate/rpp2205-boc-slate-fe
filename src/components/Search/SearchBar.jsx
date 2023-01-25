import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";

export default function SearchBar(props) {

  function searchQuery() {
    axios.get('https://api.rawg.io/api/games?key=2539b6cc34574d38b6b056fc7477e16b')
    .then((response) => {
      console.log(response.data.results)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <input type="text" placeholder="haha placeholder you funny" onChange={searchQuery}></input>
    </div>
  )
}