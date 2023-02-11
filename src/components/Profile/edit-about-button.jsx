import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ModalComponentBio from './modal_bio.jsx';


export default function EditAboutButton(props) {
  return (
    <div>
      <ModalComponentBio mode={props.mode} selfProfile={props.selfProfile} changeBio={props.changeBio}/>
    </div>
  )

}