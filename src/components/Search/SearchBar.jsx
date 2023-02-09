import React from "react";
import { useState, useEffect, useRef} from "react";
import "./SearchBar.css";
 import {FaSearch} from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { Autocomplete, Stack, TextField, Box, InputAdornment} from "@mui/material";
 import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




//  import { makeStyles, Theme } from "@material-ui/core/styles";
//  import SearchIcon from '@material-ui/icons/Search';


export default function Search(props) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('game');
  const handleValueChange = (event) => {
    setValue(event.target.value);
    console.log('value', value);
  }
 
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
    //get game name only 
    // axios.get(`/games/keyword/${query}/1`)
    //   .then(response => {
    //     // console.log(response.data);
    //     setQuery(query)
    //    const newData = response.data.map(item => {
    //       return {'name': item.name}
    //     });
    //     setData(newData);
    //   })
    //  .catch(err => console.log(err));

     //get username and game name 
    // const urls = [`/games/keyword/${query}/1`, `/users/${query}`]
    // const requests = urls.map(url => axios.get(url));
    
    // axios.all(requests).then((responses) => {
    //   console.log('response', responses)
    //   console.log('value', value);
    //   let fullData = [];
    //   responses.forEach(response => {
    //     if(value === "game") {
    //       var data = Array.from(response.data);
    //        const gameData = data.map(item => {
    //         return {'name': item.name}
    //       });
    //       fullData = fullData.concat(gameData);
    //       setOptions(fullData);
    //     } else if (value === "user") {
    //       const userData = response.data.users.slice(0, 20).map(item => {
    //         return {'name': item.username};
    //       })
    //       setOptions(userData);
    //     }
    //   })
     
    // })
    // //search based on radio 
    if(value === "game") {
       axios.get(`/games/keyword/${query}/1`)
      .then(response => {
        // console.log(response.data);
        setQuery(query)
       const newData = response.data.map(item => {
          return {'name': item.name}
        });
        setOptions(newData);
      })
     .catch(err => console.log(err));
    } 
    if (value === "user") {
      axios.get(`/users/${query}`)
      .then(response => {
         console.log(response.data);
        setQuery(query)
       const newData = response.data.users.map(item => {
          return {'name': item.username}
        });
        setOptions(newData);
      })
     .catch(err => console.log(err));
    }
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
    navigate(`/results/${query}`, {state: {query : query, value: value}})
  }
  const keyPress = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      navigate(`/results/${query}`, {state: {query : query,  value: value}})
    }
   
  }


    return (
      <>
      <FormControl>
        <FormLabel id="searchBar">Search</FormLabel>
        <RadioGroup
         aria-labelledby="demo-controlled-radio-buttons-group"
         name="controlled-radio-buttons-group"
         value={value}
         control={<Radio />}
         onChange={handleValueChange}
       >
        <FormControlLabel value="game" control={<Radio />} label="Games" />
        <FormControlLabel value="user" control={<Radio />} label="Users" />
        </RadioGroup>

      </FormControl>
     <Autocomplete
        id="autosearch"
        options={options}
        // groupBy={(option) => option.category}
        onInputChange={onInputChange}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
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

