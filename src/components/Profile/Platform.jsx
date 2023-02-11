import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Platform(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/results-for-platform/${props.platform.platform.id}`)
  }
  return(
    <>
      <Button variant="outlined" sx={{"margin-right": "5px", "margin-left": "5px", "textColor": (props.mode ? "silver" : "black")}} onClick={handleClick} label={props.platform.platform.name}>{props.platform.platform.name}</Button>
    </>

  );

}