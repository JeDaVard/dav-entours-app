import React from 'react';
import classes from "./LocLink.module.css";
import Justicon from "../Justicon";

const LocLink = props => (
    <a
        href={`https://www.google.com/maps/place/${props.coordinates.slice().reverse()}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
    >
        {props.children || (
            <div className={classes.location}>
                <Justicon icon={'map-pin'} className={classes.locIcon}/>
                <p>{props.address}</p>
            </div>
        )}
    </a>
)

export default LocLink