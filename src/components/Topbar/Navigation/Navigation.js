import React from "react";
import classes from "./Navigation.module.css";

function Navigation() {
    return (
        <nav className={classes.Navigation}>
            <ul className={classes.Navigation__menu}>
                <li><a href="/">GEO</a></li>
                <li><a href="/">Make a tour</a></li>
                <li><a href="/">Help</a></li>
                <li><a href="/">Log In</a></li>
            </ul>
            <div className={classes.Navigation__user}>
                <button className={classes.Navigation__signup}>Sign Up</button>
            </div>
        </nav>
    )
}

export default Navigation