import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


export default function UserProfile(props) {
  let { userId } = useParams();
  console.log(userId);
  return(
    <>
      <h1> {'placeholder for UserProfile page...'} </h1>
    </>
  );

}