import React from "react";
import { useState, useEffect, useRef} from "react";
import "./SearchBar.css";
 import {FaSearch} from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { Autocomplete, Stack, TextField, Box} from "@mui/material";


export default function Search(props) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const previousController = useRef();
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const getData = (query) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    axios.get(`/games/keyword/${query}/1`)
      .then(response => {
        //console.log(response.data);
       const newData = response.data.map(item => {
          return {'name': item.name}
        });
        setOptions(newData);
       // console.log(options);
      })
      .catch(err => console.log(err))
  }

  const onInputChange = (event, value, reason) => {
    if(value) {
      getData(value);
    } else {
      setOptions([]);
    }
  }

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
      pathname: "/results/:params",
      search: `?${query}`
    })
    setQuery("");
    console.log(query)
  }

    // return (
    //   <div>
    //     <input type="text" placeholder="Search here" onChange={handleChange} className="query" />
    //      < FaSearch className="searchIcon" onClick={searchClick}/>
    //   </div>
    // )
    return (
      <>
     <Autocomplete
        id="autosearch"
        options={options}
        onInputChange={onInputChange}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField  {...params} label="Search" variant="outlined" />
        )}
      />
         < FaSearch className="searchIcon" onClick={searchClick}/>
      
         </>
    )
};
