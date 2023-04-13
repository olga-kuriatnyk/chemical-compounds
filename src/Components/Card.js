import React from "react";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Card({ title, subtitle, description, image }) {
  return (
    <div class="col">
      <div class="card h-100">
        <img src={image} class="card-img-top" alt="" />
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <h4>CID: {subtitle}</h4>
          <p class="card-text">{description}</p>
        </div>
      </div>

    </div>
  )
}

export default Card;
