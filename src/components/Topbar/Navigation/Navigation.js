import React from "react";
import classes from "./Navigation.module.css";
import user from './user.jpg';
import Separator from "../../UI/Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";

function Navigation(props) {
    const profile = (
        <div className={classes.Navigation__profile} onClick={props.profileHandler}>
            <p className={classes.Navigation__profile}>Davit</p><img src={user} alt="user"/>
        </div>
    )
    return (
            <nav className={classes.Navigation}>
                <ul className={`${classes.Navigation__menu} ${props.transparent && classes.Navigation__menu__transparent}`}>
                    <li><a href="/">GEO</a></li>
                    <li><a href="/">Make a tour</a></li>
                    <li><a href="/">Help</a></li>
                    <li><a href="#" onClick={props.loginModal}>Log In</a></li>
                </ul>
        <OutsideAlerter delegate={props.handleClose}>
                <div className={classes.Navigation__user}>
                    <div className={`${classes.Navigation__signup} ${props.transparent && !props.profileDrop && classes.Navigation__signup__transparent}`}>
                        {props.isLogged ? profile : <button onClick={props.signUpModal}>Sign Up</button>}
                    </div>
                    <div className={!props.profileDrop ? `${classes.Navigation__profileDrop} ${classes.Navigation__profileDrop__close}` : `${classes.Navigation__profileDrop}`}>
                        <ul className={classes.Navigation__profileDrop__ul1}>
                           <a href=""> <li>Messages</li></a>
                            <a href=""> <li>Trips</li></a>
                            <a href=""> <li>Saved</li></a>
                        </ul>
                        <Separator />
                        <ul className={classes.Navigation__profileDrop__ul2}>
                            <a href=""><li>Account</li></a>
                            <a href=""> <li>Help</li></a>
                            <a href=""> <li>Logout</li></a>
                        </ul>
                    </div>
                </div>
        </OutsideAlerter>
            </nav>
    )
}

export default Navigation