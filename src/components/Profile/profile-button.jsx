import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function ProfileButton(props) {
  console.log('profilebutton', props.isAuthenticated);
  if (props.isAuthenticated) {
    return (
      <>
        <div>
          <button>My Profile</button>
        </div>
      </>
    )

  } else {
    return null;
  }

}