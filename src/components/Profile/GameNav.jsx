import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalComponent from './modal.jsx';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function GameNav(props) {
  if (!props.gameProfile) {
    return null;
  }
  return (
    <div class="gameNav">
      <Stack direction="row" spacing={2} style={{"color": props.mode ? "silver" : "black"}}>
        <Typography id="all-games" >All Games</Typography>
        <Typography id="arrow" >></Typography>
        <Typography id="genre">{props.gameProfile.genres.length > 0 ? props.gameProfile.genres[0].name : null}</Typography>
        <Typography id="arrow" >></Typography>
        <Typography id="game-name">{props.gameProfile.name}</Typography>
      </Stack>
    </div>
  )
}