import React from "react";
import classes from "./Navigation.module.css";
import Separator from "../../UI/Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";
import {Link} from "react-router-dom";
import Logout from "./Logout";
import Justicon from "../../UI/JustIcon/Justicon";
import SmallShow from "../../UI/SmallShow/SmallShow";
import classNames from 'classnames/bind';

const cx = classNames.bind(classes)

function Navigation(props) {
    const { name, photo } = props;
    return (
            <nav className={classes.Navigation}>
        <OutsideAlerter delegate={props.handleClose}>
            <SmallShow
                handler={(trigger, opposite) => trigger(!opposite)}
                button={(
                    <div className={cx(classes.profile, {[classes.profileBlur]: props.transparent})}>
                       <Justicon icon={'menu'} className={classes.menuIcon}/>
                       <img src={`${process.env.REACT_APP_SERVER}/images/user/${photo}`} alt="user" />
                    </div>
                )}
            >
                <h1>text</h1>
            </SmallShow>
                {/*<div className={classes.user}>*/}
                    {/*<div className={`${classes.signup} ${props.transparent && !props.profileDrop && classes.signup__transparent}`}>*/}
                    {/*    {props.isLogged*/}
                    {/*        ?   <div className={classes.profile} onClick={props.profileHandler}>*/}
                    {/*                <Justicon icon={'menu'} className={classes.menuIcon}/>*/}
                    {/*                <img src={`${process.env.REACT_APP_SERVER}/images/user/${photo}`} alt="user" />*/}
                    {/*            </div>*/}
                    {/*        : <button onClick={props.signUpModal}>Sign Up</button>}*/}
                    {/*</div>*/}
                {/*    <div className={!props.profileDrop ? `${classes.profileDrop} ${classes.profileDrop__close}` : `${classes.profileDrop}`}>*/}
                {/*        <ul className={classes.profileDrop__ul1}>*/}
                {/*            <Link to={{pathname: '/inbox'}}><li onClick={props.handleClose}>Inbox</li></Link>*/}
                {/*            <Link to={{pathname: '/tourevents'}}><li onClick={props.handleClose}>Tours</li></Link>*/}
                {/*            <Link to={{pathname: '/saved'}}><li onClick={props.handleClose}>Saved</li></Link>*/}
                {/*            <Link to={{pathname: '/me'}}><li onClick={props.handleClose}>Profile</li></Link>*/}
                {/*        </ul>*/}
                {/*        <Separator color={'light'}/>*/}
                {/*        <ul className={classes.profileDrop__ul1}>*/}
                {/*            <Link to={{pathname: '/make'}}><li onClick={props.handleClose}>Make a Tour</li></Link>*/}
                {/*            <Link to={{pathname: '/mytours'}}><li onClick={props.handleClose}>My Tours</li></Link>*/}
                {/*        </ul>*/}
                {/*        <Separator color={'light'}/>*/}
                {/*        <ul className={classes.profileDrop__ul2}>*/}
                {/*            <Logout onClose={props.handleClose}>Logout</Logout>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
        </OutsideAlerter>
            </nav>
    )
}

export default Navigation