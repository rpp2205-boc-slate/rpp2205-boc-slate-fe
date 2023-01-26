import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Profile(props) {
  console.log(props.isAuthenticated);
  return (
    <div class="myprofile">
      <div class="leftColumn">
        <div class="profilePhoto">placeholder for photo</div>
        <div class="username">{props.userId}</div>
        <div class="online">online</div>
        <div class="friends buttons">buttons</div>
      </div>
      <div class="rightColumn">
        <div class="about me">about me</div>
      </div>
    </div>
  )

}