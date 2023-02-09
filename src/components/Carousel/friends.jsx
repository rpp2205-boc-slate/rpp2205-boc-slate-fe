import imgTest from './Testing/1.png';
import axios from 'axios'
import React from 'react';
import { useEffect, useState } from 'react';
import './F.css';

function Fri (props) {
  const [fr, setFr] = useState({});



  useEffect(() => {
    axios.get(`/user/${props.f.user_id}/profile`)
      .then((response) => {
        setFr(response.data)
      })
      .catch((error) => {
        console.log('Error ', error)
      })
  }, [props.f])

return (

    <div onClick={(e) => props.clickFun(`${fr.user_id}`)} className='fcard'>
      <div className='fcard-top'>
      <img src={fr.photos && fr.photos.length > 0 ? fr.photos[0].photo_url : imgTest} alt='img' />
      </div>
      <div className='fcard-bottom'>{fr.name}</div>
    </div>

)




}


export default Fri