import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function FriendRequestButtons(props) {
  return (
    <div>
      {props.userId}
      <button>Accept Friends Request</button>
      <button>Deny Friends Request</button>
      <button>Unfriend</button>
      <button>Send Friend Request</button>
    </div>
  )
}