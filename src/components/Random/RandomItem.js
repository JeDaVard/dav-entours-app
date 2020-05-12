import React from 'react';
import { Link } from "react-router-dom";
import classes from "./RandomItem.module.css";

export default ({ tour }) => (
    <div className={classes.Random__post}>
        <Link to={loc => {
            return {pathname: `/tour/${tour.slug}`, state: tour}
        }}>
            <div className={classes.Random__info}>
                <h2>{tour.name}</h2>
                <p>{tour.startLocation.description}</p>
            </div>
            <img src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`} alt="tour"/>
        </Link>
    </div>
)