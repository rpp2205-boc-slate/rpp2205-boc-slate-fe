import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Profile(props) {
  console.log(props.isAuthenticated);
  if (props.userId === 'self') {
    return (
      <div class="profile-for-all">
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
  } else if (props.userId) {
    return (
      <div class="profile-for-all">
        <div class="leftColumn">
          <div class="profilePhoto">placeholder for photo</div>
          <div class="username">{props.userId}</div>
          <div class="online">online</div>
          <div class="friends buttons">buttons</div>
        </div>
        <div class="rightColumn">
          <div class="about me">{'about user ' + props.userId}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div class="profile-for-all">
        <div class="leftColumn">
          <div class="profilePhoto">placeholder for photo</div>
          <div class="username">{props.userId}</div>
          <div class="friends buttons">buttons</div>
        </div>
        <div class="rightColumn">
          <div class="about me">about game</div>
        </div>
      </div>
    )
  }


}