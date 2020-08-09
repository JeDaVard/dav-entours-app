import React, {useState} from "react";
import classes from "./NavProfile.module.css";
import Separator from "../UI/Separator/Separator";
import {Link} from "react-router-dom";
import Logout from "./Logout";
import Justicon from "../UI/JustIcon/Justicon";
import SmallShow from "../UI/SmallShow/SmallShow";
import classNames from 'classnames/bind';

const cx = classNames.bind(classes)

function NavProfile(props) {
    const { photo } = props;
    const [ show, setShow ] = useState(false);

    return (
            <div className={classes.Navigation}>
            <SmallShow
                showIn={[show, setShow]}
                className={classes.profileDrop}
                button={(
                    <div className={cx(classes.profile, {[classes.profileBlur]: props.transparent})}>
                       <Justicon icon={'menu'} className={classes.menuIcon}/>
                       <img src={`${process.env.REACT_APP_SERVER}/images/user/${photo}`} alt="user" />
                    </div>
                )}
            >
                <div onClick={() => setShow(false)}>
                    {props.isLogged ? (
                        <>
                            <ul className={classes.profileDrop__ul1}>
                                <Link to={'/inbox'}>
                                    <li>
                                        <Justicon icon={'inbox'}/>
                                        <h4>Inbox</h4>
                                    </li>
                                </Link>
                                <Link to={'/tourevents'}>
                                    <li>
                                        <Justicon icon={'map-pin'}/>
                                        <h4>Ordered Tours</h4>
                                    </li>
                                </Link>
                                <Link to={'/saved'}>
                                    <li>
                                        <Justicon icon={'heart'}/>
                                        <h4>Saved Tours</h4>
                                    </li>
                                </Link>
                                <Link to={'/me'}>
                                    <li>
                                        <Justicon icon={'user'}/>
                                        <h4>My Profile</h4>
                                    </li>
                                </Link>
                            </ul>
                            <Separator color={'light'}/>
                            <ul className={classes.profileDrop__ul1}>
                                <Link to={{pathname: '/make'}}><li>Make a Tour</li></Link>
                                <Link to={{pathname: '/mytours'}}><li>My Tours</li></Link>
                            </ul>
                            <Separator color={'light'}/>
                            <ul className={classes.profileDrop__ul2}>
                                <Logout>Logout</Logout>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className={classes.profileDrop__ul1}>
                                <button
                                    onClick={props.loginModal}
                                    className={classes.profileButton}>
                                    <li>Log in</li>
                                </button>
                                <Separator color={'light'}/>
                                <button
                                    onClick={props.signUpModal}
                                    className={classes.profileButton}>
                                    <li>Sign Up</li>
                                </button>
                                <Link to={{pathname: '/tourevents'}}><li>Tours</li></Link>
                            </ul>
                        </>
                    )}
                    </div>
                </SmallShow>
            </div>
    )
}

export default NavProfile