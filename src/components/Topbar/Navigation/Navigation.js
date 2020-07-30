import React from "react";
import classes from "./Navigation.module.css";
import Separator from "../../UI/Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";
import {Link} from "react-router-dom";
import Logout from "./Logout";
import Justicon from "../../UI/JustIcon/Justicon";

function Navigation(props) {
    const { name, photo } = props;
    return (
            <nav className={classes.Navigation}>
                <OutsideAlerter delegate={props.closeGeo}>
                    <div className={props.geo ? classes.geo : classes.geo_Closed}>
                        <ul>
                            <Link to={{pathname: '/me'}}><li>Currency - $</li></Link>
                            <Link to={{pathname: '/me'}}><li>English - US</li></Link>
                        </ul>
                    </div>
                </OutsideAlerter>
                <div className={`${classes.menu} ${props.transparent && classes.menu__transparent}`}>
                    <Link to={'#'} onClick={props.geoHandler}>
                        <div className={classes.geoBox}>
                            <Justicon icon={'globe'} className={classes.geoIcon}/>
                            <Justicon icon={'chevron-down'} className={classes.geoIcon}/>
                        </div>
                    </Link>
                    <Link to="/make">Make a tour</Link>
                    {!props.isLogged && <Link to="/" onClick={(e) => {e.preventDefault(); props.loginModal()}}>Log In</Link>}
                </div>
        <OutsideAlerter delegate={props.handleClose}>
                <div className={classes.user}>
                    <div className={`${classes.signup} ${props.transparent && !props.profileDrop && classes.signup__transparent}`}>
                        {props.isLogged
                            ? <div className={classes.profile} onClick={props.profileHandler}>
                                <Justicon icon={'menu'} className={classes.menuIcon}/>
                                <img src={`${process.env.REACT_APP_SERVER}/images/user/${photo}`} alt="user" />
                            </div>
                            : <button onClick={props.signUpModal}>Sign Up</button>}
                    </div>
                    <div className={!props.profileDrop ? `${classes.profileDrop} ${classes.profileDrop__close}` : `${classes.profileDrop}`}>
                        <ul className={classes.profileDrop__ul1}>
                            <Link to={{pathname: '/inbox'}}><li onClick={props.handleClose}>Inbox</li></Link>
                            <Link to={{pathname: '/tourevents'}}><li onClick={props.handleClose}>Tours</li></Link>
                            <Link to={{pathname: '/saved'}}><li onClick={props.handleClose}>Saved</li></Link>
                            <Link to={{pathname: '/me'}}><li onClick={props.handleClose}>Profile</li></Link>
                        </ul>
                        <Separator color={'light'}/>
                        <ul className={classes.profileDrop__ul1}>
                            <Link to={{pathname: '/make'}}><li onClick={props.handleClose}>Make a Tour</li></Link>
                            <Link to={{pathname: '/mytours'}}><li onClick={props.handleClose}>My Tours</li></Link>
                        </ul>
                        <Separator color={'light'}/>
                        <ul className={classes.profileDrop__ul2}>
                            <Logout onClose={props.handleClose}>Logout</Logout>
                        </ul>
                    </div>
                </div>
        </OutsideAlerter>
            </nav>
    )
}

export default Navigation