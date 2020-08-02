import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes)

function Navigation(props) {
    const style = [
        cx(classes.link, {[classes.linkBlack]: props.searching}),
        cx(classes.linkActive, {linkActiveBlack: props.searching}),
    ];

    return (
        <nav className={classes.navigation}>
            <NavLink
                to={'/'}
                className={style[0]}
                activeClassName={style[1]}
            >
                Find a tour
            </NavLink>
            <NavLink
                to={'/make'}
                className={style[0]}
                activeClassName={style[1]}
            >
                Make a tour
            </NavLink>
            <NavLink
                to={'/saved'}
                className={style[0]}
                activeClassName={style[1]}
            >
                Saved tours
            </NavLink>
            <NavLink
                to={'/help'}
                className={style[0]}
                activeClassName={style[1]}
            >
                Get a help
            </NavLink>
        </nav>
    );
}

export default Navigation;
