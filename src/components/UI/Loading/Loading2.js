import React from "react";
import classes from "./Loading2.module.css";

const Loading2 = () => {
    return (
        <div className={classes.Loading__shape}>
            <div className={classes.Loading} >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading2