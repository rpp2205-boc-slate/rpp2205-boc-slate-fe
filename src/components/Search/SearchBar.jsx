import React from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";
import {FaSearch} from "react-icons/fa"

export default function Search() {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

    return (
      <div>
        <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
        < FaSearch className="searchIcon"/>
      </div>
    )
};