import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalComponent from './modal.jsx';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


export default function GameNav(props) {
  const navigate = useNavigate();
  const redirectToAllResults = () => {
    navigate("/results/");
  }
  const redirectToGenre = () => {
    if (props.gameProfile.genres.length > 0) {
      const genre = props.gameProfile.genres[0].slug;
      navigate(`/results-for-genre/${genre}`)
    }
  }
  if (!props.gameProfile) {
    return null;
  }
  return (
    <div class="gameNav">
      <Stack direction="row" spacing={2} style={{"color": props.mode ? "silver" : "black"}}>
        <Button style={{"textColor": props.mode ? "silver" : "black"}} id="all-games" variant="text" onClick={redirectToAllResults}>All Games</Button>
        <Typography id="arrow" >></Typography>
        <Button style={{"textColor": props.mode ? "silver" : "black"}} id="genre" variant="text" onClick={redirectToGenre}>{props.gameProfile.genres.length > 0 ? props.gameProfile.genres[0].name : null}</Button>
        <Typography id="arrow" >></Typography>
        <Button style={{"textColor": props.mode ? "silver" : "black"}} id="game-name">{props.gameProfile.name}</Button>
      </Stack>
    </div>
  )
}