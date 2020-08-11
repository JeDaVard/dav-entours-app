import React from 'react';
import classes from './MobileBar.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { NavLink, useRouteMatch } from "react-router-dom";
import UserAvatar from "../UI/UserAvatar/UserAvatar";

function MobileBar(props) {
    const messageMatch = useRouteMatch("/inbox/:id");
    const style = messageMatch ? { display: 'none'} : {};

    return (
        <nav className={classes.bar} style={style}>
            <div className={classes.MobileBar}>
                <NavLink to={'/'} exact className={classes.tab} activeClassName={classes.tab__active}>
                    <svg className={classes.icon}>
                        <use href={sprite + "#icon-compass"} />
                    </svg>
                    <h2>Explore</h2>
                </NavLink>
                <NavLink to={'/tours'} className={classes.tab} activeClassName={classes.tab__active}>
                    <svg className={classes.icon}>
                        <use href={sprite + "#icon-search"} />
                    </svg>
                    <h2>Search</h2>
                </NavLink>
                <NavLink to={'/tourevents'} className={classes.tab} activeClassName={classes.tab__active}>
                    <svg className={classes.icon}>
                        <use href={sprite + "#icon-map"} />
                    </svg>
                    <h2>Tours</h2>
                </NavLink>
                <NavLink to={'/inbox'} className={classes.tab} activeClassName={classes.tab__active}>
                    <svg className={classes.icon}>
                        <use href={sprite + "#icon-inbox"} />
                    </svg>
                    <h2>Inbox</h2>
                </NavLink>
                <NavLink to={{pathname: '/me'}} className={classes.tab} activeClassName={classes.tab__active}>
                    <div className={classes.photo}>
                        <UserAvatar src={props.photo} alt={'me'}/>
                    </div>
                    <h2>Profile</h2>
                </NavLink>
            </div>
        </nav>
    );
}

export default MobileBar;
