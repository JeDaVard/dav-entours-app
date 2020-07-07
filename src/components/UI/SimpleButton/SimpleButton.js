import React from "react";
import classes from './SimpleButton.module.css';
import {Link} from "react-router-dom";

function SimpleButton({to, children, white, primary, onClick, disabled}) {
    const style = primary ? classes.SimpleButton__primary
            : white ? classes.SimpleButton__white
        : classes.SimpleButton__black;

    return (
        <div className={`${classes.SimpleButton} ${style}`}>
            { onClick
                ? <button disabled={disabled} onClick={onClick}>{children}</button>
                : <Link to={to}>{children}</Link> }
        </div>
    )
}

export default SimpleButton