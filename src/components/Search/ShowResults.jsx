import React, { useState } from "react";
import imgTest from '../Carousel/Testing/1.png';
import './C.css';


export default function showResults(input) {
  const [defaultImage, setDefaultImage] = useState({});
  let cardStyle = {
    height: "40px",
    width: "20px",
    backgroundColor: "purple",
    border: "1px solid black",
    padding: "20px"
  }

  let rowStyle =  {
    top: "200px",
    display: "in-line block",
    padding: "10px"
  }
  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgTest,
    }));
  };

  return (<div className>
    {input.map((item) => (
      <div  key={item.id} className="card">
        <div className="card-top">
          <img
            src={
              defaultImage[item.title] === item.title
                ? defaultImage.linkDefault
                : item.linkImg
            }
            alt={item.title}
            onError={handleErrorImage}
          />
          <h1>{item.title}</h1>
        </div>
        <div className="card-bottom">
          <h3>{item.price}</h3>
          <span className="category">{item.category}</span>
        </div>
      </div>
    ))}
  </div>)
  console.log(rows)
  return rows;
}