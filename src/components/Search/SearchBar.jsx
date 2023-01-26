import React from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";
// import {FaSearch} from "react-icons/fa"

export default function Search() {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

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
        <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
        {/* < FaSearch className="searchIcon"/> */}
      </div>
    )
};
