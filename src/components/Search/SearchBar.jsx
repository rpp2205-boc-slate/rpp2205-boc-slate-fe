import React from "react";
import { useState, useEffect, useRef} from "react";
import "./SearchBar.css";
 import {FaSearch} from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { Autocomplete, Stack, TextField, Box, InputAdornment} from "@mui/material";
//  import { makeStyles, Theme } from "@material-ui/core/styles";
//  import SearchIcon from '@material-ui/icons/Search';


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
        // console.log(response.data);
        setQuery(query)
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


  const navigate = useNavigate();
  const searchClick = (e) => {
    navigate(`/results/${query}`, {state: {query : query}})
  }
  const keyPress = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      navigate(`/results/${query}`, {state: {query : query}})
    }
   
  }


    return (
      <>
     <Autocomplete
        id="autosearch"
        options={options}
        onInputChange={onInputChange}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField  {...params} label="Search" variant="outlined" onKeyDown={(e) => {
            console.log(`Pressed keyCode ${e.key}`)
            keyPress(e)}} 
          
            />
        )}
      />
         < FaSearch className="searchIcon" onClick={ searchClick}/>

         </>
    )
};

