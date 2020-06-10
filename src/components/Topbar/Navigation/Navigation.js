import React from "react";
import classes from "./Navigation.module.css";
import Separator from "../../UI/Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";
import {Link} from "react-router-dom";
import Logout from "./Logout";
import Justicon from "../../UI/Justicon";

function Navigation(props) {
    const { name, photo } = props;
    return (
            <nav className={classes.Navigation}>
                <OutsideAlerter delegate={props.closeGeo}>
                    <div className={props.geo ? classes.Navigation__geo : classes.Navigation__geo_Closed}>
                        <ul>
                            <Link to={{pathname: '/me'}}><li>Currency - $</li></Link>
                            <Link to={{pathname: '/me'}}><li>English - US</li></Link>
                        </ul>
                    </div>
                </OutsideAlerter>
                <div className={`${classes.Navigation__menu} ${props.transparent && classes.Navigation__menu__transparent}`}>
                    <Link to={'#'} onClick={props.geoHandler}>
                        <div className={classes.Navigation__geoBox}>
                            <Justicon icon={'globe'} className={classes.Navigation__geoIcon}/>
                            <Justicon icon={'chevron-down'} className={classes.Navigation__geoIcon}/>
                        </div>
                    </Link>
                    <Link to="/">Make a tour</Link>
                    {!props.isLogged && <Link to="/" onClick={(e) => {e.preventDefault(); props.loginModal()}}>Log In</Link>}
                </div>
        <OutsideAlerter delegate={props.handleClose}>
                <div className={classes.Navigation__user}>
                    <div className={`${classes.Navigation__signup} ${props.transparent && !props.profileDrop && classes.Navigation__signup__transparent}`}>
                        {props.isLogged
                            ? <div className={classes.Navigation__profile} onClick={props.profileHandler}>
                                <p>{name ? name.split(' ')[0] : 'Entours'}</p>
                                <img src={`${process.env.REACT_APP_SERVER}/images/user/${photo}`} alt="user" />
                            </div>
                            : <button onClick={props.signUpModal}>Sign Up</button>}
                    </div>
                    <div className={!props.profileDrop ? `${classes.Navigation__profileDrop} ${classes.Navigation__profileDrop__close}` : `${classes.Navigation__profileDrop}`}>
                        <ul className={classes.Navigation__profileDrop__ul1}>
                            <Link to={{pathname: '/me'}}><li onClick={props.handleClose}>Profile</li></Link>
                            <Link to={{pathname: '/tourevents'}}><li onClick={props.handleClose}>Tours</li></Link>
                            <Link to={{pathname: '/saved'}}><li onClick={props.handleClose}>Saved</li></Link>
                            <Link to={{pathname: '/inbox'}}><li onClick={props.handleClose}>Inbox</li></Link>
                        </ul>
                        <Separator color={'light'}/>
                        <ul className={classes.Navigation__profileDrop__ul2}>
                            <Logout onClose={props.handleClose}>Logout</Logout>
                        </ul>
                    </div>
                </div>
        </OutsideAlerter>
            </nav>
    )
}

export default Navigation