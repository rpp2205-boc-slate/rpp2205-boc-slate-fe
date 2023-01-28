import React from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";
 import {FaSearch} from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  // function searchQuery() {
  //   axios.get('https://api.rawg.io/api/games?key=2539b6cc34574d38b6b056fc7477e16b')
  //   .then((response) => {
  //     console.log(response.data.results)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
  const navigate = useNavigate();
  const searchClick = (e) => {
    console.log(query)

    navigate({
      pathname: "/results:params",
      search: `?${query}`
    })
  }

    return (
      <div>
        <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
         < FaSearch className="searchIcon" onClick={searchClick} value={query}/>
      </div>
    )
};
