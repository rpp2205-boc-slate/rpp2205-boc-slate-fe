import React from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";
import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export default function Search(props) {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const navigate = useNavigate();
  const searchClick = (e) => {
    navigate(`/results/${query}`, {state: {query : query}})
  }

    return (
      <div>
        <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
         < FaSearch className="searchIcon" onClick={searchClick}/>
      </div>
    )
};
