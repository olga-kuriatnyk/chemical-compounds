import React from "react";
import './Card.css';



function Card({title, subtitle, description, image}) {
    return (
        
        <div className="card-block bg-alt">
            <img src={image} className="card-media shadow-l-dark" alt=""  />
            <div className="card-content">
            
                <div className="card-text">
                    <h2>{title}</h2>
                    <h4>{subtitle}</h4>
                    <p>{description}</p>
                </div>
                
            </div>
            
            
        </div>
        
    )
}

export default Card;