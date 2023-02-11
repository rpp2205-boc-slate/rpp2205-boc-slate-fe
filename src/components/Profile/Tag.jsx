import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";


String.prototype.hashCode = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const colors = {0: "light-blue", 1: "lightsteelblue", 2: "paleturquoise", 3: "#ABD4FF", 4: "#8DB8FF", 5: "#6E9EFF", 6: "#4D84EB", 7: "#0053B2", 8: "#003D97"};

const selectColorForString = (str) => {
  var hashed = Math.abs(str.hashCode());
  return colors[hashed % (Object.keys(colors).length)];
}

export default function Tag(props) {
  const navigate = useNavigate();
  const clickTag = () => {
    navigate(`/results-for-tag/${props.tag.slug}`)
  }

  return(
    <div class="chip">
      <Chip onClick={clickTag} label={props.tag.name} style={{"backgroundColor":selectColorForString(props.tag.name), "color": (props.mode ? "white" : "black")}}/>
    </div>
  );

}