import React from "react";
import classes from './SimpleButton.module.css';
import {Link} from "react-router-dom";

function SimpleButton({to, children, white, primary}) {
    const style = primary ? classes.SimpleButton__primary
            : white ? classes.SimpleButton__white
        : classes.SimpleButton__black;

    return (
        <div className={`${classes.SimpleButton} ${style}`}>
            <Link to={to}>{children}</Link>
        </div>
    )
}

export default SimpleButton