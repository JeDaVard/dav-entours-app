import React from "react";
import classes from './ImageControls.module.css';
import Justicon from "../../../components/UI/JustIcon/Justicon";

export default function ImageControls(props) {
    return (
        <div className={classes.controls} style={props.style}>
            <button onClick={e => props.removeImage(e, props.imageLink)}>
                <Justicon icon={'trash'} className={classes.controlIcon}/>
            </button>
        </div>
    )
}