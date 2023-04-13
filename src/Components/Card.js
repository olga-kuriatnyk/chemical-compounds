import React from "react";
import './Card.css';
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

{/* // <div class="col-sm-6 col-md-4">
            //     <div class="thumbnail">
            //         <img src={image} alt=""  />
            //         <div class="caption">
            //             <h3>{title}</h3>
            //             <h4>{subtitle}</h4>
            //             <p>{description}</p>
            //         </div>
            //     </div>
            // </div> */}
{/* <div className="card-block bg-alt">
<img src={image} className="card-media shadow-l-dark" alt=""  />
<div className="card-content">            
    <div className="card-text">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
    </div>                
</div>
</div> */}