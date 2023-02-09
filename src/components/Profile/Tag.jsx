import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Chip from '@mui/material/Chip';

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

const colors = {0: "bisque", 1: "lightblue", 2: "mistyrose", 3: "coral", 4: "plum", 5: "honeydew", 6: "palegreen", 8: "ivory", 9: "khaki", 10: "sandybrown", 11: "lemonchiffon", 12: "peachpuff", 13: "violet", 14: "aqua", 15: "thistle", 16: "gold"};

const selectColorForString = (str) => {
  var hashed = str.hashCode();
  return colors[hashed % 17];
}

export default function Tag(props) {
  return(
    <div class="chip">
      <Chip label={props.tag.name} style={{"backgroundColor":selectColorForString(props.tag.name)}}/>
    </div>
  );

}