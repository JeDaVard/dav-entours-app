import React from 'react';
import classes from './MobileBar.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { NavLink } from "react-router-dom";

function MobileBar(props) {
    return (
        <nav className={classes.MobileBar__bar}>
            <div className={classes.MobileBar}>
                <NavLink to={'/'} exact className={classes.MobileBar__tab} activeClassName={classes.MobileBar__tab__active}>
                    <svg className={classes.MobileBar__icon}>
                        <use href={sprite + "#icon-compass"} />
                    </svg>
                    <h2>Explore</h2>
                </NavLink>
                <NavLink to={'/l'} className={classes.MobileBar__tab} activeClassName={classes.MobileBar__tab__active}>
                    <svg className={classes.MobileBar__icon}>
                        <use href={sprite + "#icon-heart"} />
                    </svg>
                    <h2>Saved</h2>
                </NavLink>
                <NavLink to={'/h'} className={classes.MobileBar__tab} activeClassName={classes.MobileBar__tab__active}>
                    <svg className={classes.MobileBar__icon}>
                        <use href={sprite + "#icon-map"} />
                    </svg>
                    <h2>Tours</h2>
                </NavLink>
                <NavLink to={'/u'} className={classes.MobileBar__tab} activeClassName={classes.MobileBar__tab__active}>
                    <svg className={classes.MobileBar__icon}>
                        <use href={sprite + "#icon-inbox"} />
                    </svg>
                    <h2>Inbox</h2>
                </NavLink>
                <NavLink to={{pathname: '/me'}} className={classes.MobileBar__tab} activeClassName={classes.MobileBar__tab__active}>
                    <div className={classes.MobileBar__photo}>
                        <img src={props.photo} alt='Photo' />
                    </div>
                    <h2>Profile</h2>
                </NavLink>
            </div>
        </nav>
    );
}

export default MobileBar;
