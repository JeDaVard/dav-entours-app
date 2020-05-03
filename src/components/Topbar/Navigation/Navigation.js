import React from "react";
import classes from "./Navigation.module.css";

function Navigation(props) {
    return (
        <nav className={classes.Navigation}>
            <ul className={`${classes.Navigation__menu} ${props.transparent && classes.Navigation__menu__transparent}`}>
                <li><a href="/">GEO</a></li>
                <li><a href="/">Make a tour</a></li>
                <li><a href="/">Help</a></li>
                <li><a href="/">Log In</a></li>
            </ul>
            <div className={classes.Navigation__user}>
                <button className={`${classes.Navigation__signup} ${props.transparent && classes.Navigation__signup__transparent}`}>Sign Up</button>
            </div>
        </nav>
    )
}

export default Navigation