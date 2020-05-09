import React from "react";
import { connect } from 'react-redux';
import { logout } from "../../../app/actions";
import classes from "./Navigation.module.css";
import Separator from "../../UI/Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";
import user from "./user.jpg";

function Navigation(props) {
    const { name, photo } = props;
    return (
            <nav className={classes.Navigation}>
                <ul className={`${classes.Navigation__menu} ${props.transparent && classes.Navigation__menu__transparent}`}>
                    <li><a href="/">GEO</a></li>
                    <li><a href="/">Make a tour</a></li>
                    <li><a href="/">Help</a></li>
                    {!props.isLogged && <li><a href="/#" onClick={props.loginModal}>Log In</a></li>}
                </ul>
        <OutsideAlerter delegate={props.handleClose}>
                <div className={classes.Navigation__user}>
                    <div className={`${classes.Navigation__signup} ${props.transparent && !props.profileDrop && classes.Navigation__signup__transparent}`}>
                        {props.isLogged
                            ? <div className={classes.Navigation__profile} onClick={props.profileHandler}>
                                <p>{name}</p>
                                <img src={photo} alt="user" />
                            </div>
                            : <button onClick={props.signUpModal}>Sign Up</button>}
                    </div>
                    <div className={!props.profileDrop ? `${classes.Navigation__profileDrop} ${classes.Navigation__profileDrop__close}` : `${classes.Navigation__profileDrop}`}>
                        <ul className={classes.Navigation__profileDrop__ul1}>
                           <a href="/"> <li>Messages</li></a>
                            <a href="/"> <li>Trips</li></a>
                            <a href="/"> <li>Saved</li></a>
                        </ul>
                        <Separator color={'light'}/>
                        <ul className={classes.Navigation__profileDrop__ul2}>
                            <a href="/"><li>Account</li></a>
                            <a href="/"> <li>Help</li></a>
                            <a href="/" onClick={e => {e.preventDefault(); props.logout()}}> <li>Logout</li></a>
                        </ul>
                    </div>
                </div>
        </OutsideAlerter>
            </nav>
    )
}

const mapStateToProps = state => ({
    photo: `http://localhost:5000/images/user/${state.auth.photo}`,
    name: state.auth.name.split(' ')[0]
});

const mapDispatchToProps = dispatch => ({
   logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)