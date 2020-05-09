import React from 'react';
import classes from "./RandomItem.module.css";

export default ({ tour }) => (
    <div className={classes.Random__post}>
        <div className={classes.Random__info}>
            <h2>{tour.name}</h2>
            <p>{tour.startLocation.description}</p>
        </div>
        <img src={`http://localhost:5000/images/tour/${tour.imageCover}`} alt="tour"/>
    </div>
)