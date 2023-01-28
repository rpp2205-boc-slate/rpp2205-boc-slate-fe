import React from "react";

export default function showResults(input) {
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



  let count = 0;
  let rows = [];
  for (var i = 0; i < input.length; i+=5) {
    rows.push([<tr key={i} style={rowStyle}>
      <td style={cardStyle} key={i}>
        <div>
          image Here
          <h1>{input[i + 1]}</h1>
        </div>
        <div>
          <h3>price</h3>
          <span>console</span>
        </div>
        <div>
          console
        </div>
      </td>
      <td style={cardStyle} key={i+1}>
        <div>
          image Here
          <h1>{input[i + 2]}</h1>
        </div>
        <div>
          <h3>price</h3>
          <span>console</span>
        </div>
        <div>
          console
        </div>
      </td>
      <td style={cardStyle} key={i+2}>
        <div>
          image Here
          <h1>{input[i + 3]}</h1>
        </div>
        <div>
          <h3>price</h3>
          <span>console</span>
        </div>
        <div>
          console
        </div>
      </td>
      <td style={cardStyle} key={i+3}>
        <div>
          image Here
          <h1>{input[i + 4]}</h1>
        </div>
        <div>
          <h3>price</h3>
          <span>console</span>
        </div>
        <div>
          console
        </div>
      </td>
      <td style={cardStyle} key={i+4}>
        <div>
          image Here
          <h1>{input[i + 5]}</h1>
        </div>
        <div>
          <h3>price</h3>
          <span>console</span>
        </div>
        <div>
          console
        </div>
      </td>
      </tr>])
  }
  console.log(rows)
  return rows;
}