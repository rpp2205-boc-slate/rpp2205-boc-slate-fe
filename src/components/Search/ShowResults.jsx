import React, { useState } from "react";
import imgTest from '../Carousel/Testing/1.png';
import './C.css';


export default function showResults(input) {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState(input);

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };

  return (<div className='holder'>
    {data.map((item) => (
          <div key={item.id} gameID={item.id}className="card" onClick={(e) => console.log(e.target.gamid, ' Clicked')}>
            <div gameID={item.id} className="card-top">
              <img gameID={item.id}
                src={
                  defaultImage[item.name] === item.name
                    ? defaultImage.linkDefault
                    : item.background_image
                }
                alt={item.title}
                onError={handleErrorImage}
              />
              <h1 gameID={item.id}>{item.name}</h1>
            </div>
            <div gameID={item.id} className="card-bottom">
              {/* <h3>{item.name}</h3> */}
              <span gameID={item.id}className="category">{}</span>
            </div>
          </div>
        ))}
  </div>)
  console.log(rows)
  return rows;
}