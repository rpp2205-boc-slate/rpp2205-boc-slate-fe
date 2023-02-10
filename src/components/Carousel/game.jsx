import imgTest from './Testing/1.png';
import axios from 'axios'
import React from 'react';
import "./C.css"
import { useEffect, useState } from 'react';


function Gam (props) {
  const [dlc, setDlc] = useState({});
  const [defaultImage, setDefaultImage] = useState({});
  // const [, set] = useState({});


  return (
    <div>
        <div gameid={props.g.slug} className="card-top">
          <img gameid={props.g.slug}
            src={
              defaultImage[props.g.name] === props.g.name
                ? defaultImage.linkDefault
                : props.g.background_image
            }
            alt={props.g.title}
            onError={props.error}
          />
          <h1 gameid={props.g.slug}>{props.g.name}</h1>
        </div>
        <div gameid={props.g.slug} className="card-bottom">
          <span gameid={props.g.slug}className="category">{}</span>
        </div>
      </div>
    )
}



export default Gam;