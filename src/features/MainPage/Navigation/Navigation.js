import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation() {
    return (
        <nav className={classes.navigation}>
            <NavLink
                to={'/'}
                className={classes.link}
                activeClassName={classes.linkActive}
            >
                Find a tour
            </NavLink>
            <NavLink
                to={'/make'}
                className={classes.link}
                activeClassName={classes.linkActive}
            >
                Make a tour
            </NavLink>
            <NavLink
                to={'/saved'}
                className={classes.link}
                activeClassName={classes.linkActive}
            >
                Saved tours
            </NavLink>
            <NavLink
                to={'/help'}
                className={classes.link}
                activeClassName={classes.linkActive}
            >
                Get a help
            </NavLink>
        </nav>
    )
}

export default Navigation