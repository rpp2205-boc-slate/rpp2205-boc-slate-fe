import React from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";
 import {FaSearch} from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  // function searchQuery() {
  //   axios.get('/games/keyword/:keyword', {params: {keyword: {query }}})
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
    setQuery("");
    console.log(query)
  }

    return (
      <div>
        <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
         < FaSearch className="searchIcon" onClick={searchClick} value={query}/>
      </div>
    )
};
