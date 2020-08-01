import React, { useState } from 'react';
import withScroll from '../../hocs/withScroll';
import classNames from 'classnames/bind';
import classes from './Topbar.module.css';
import logo from './entours.png';
import logo2 from './entours2.png';
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import TopSearch from './TopSearch/TopSearch';
import useScrollTrigger from "../../hooks/useScrollTrigger";

function Topbar(props) {
    const inTour = !!props.location.pathname.match(/^\/tour\/.*/);
    const inMakeTour = !!props.location.pathname.match(/^\/make.*/);
    const inMain = props.location.pathname === '/'

    const initialTrigger = inTour || inMain || inMakeTour

    const [ triggered, setTriggered ] = useScrollTrigger({changePoint: inMain ? 500 : 10});

    const isTransparent = initialTrigger && !triggered;
    const cx = classNames.bind(classes);

    const [profileDrop, setProfileDrop] = useState(false);

    const profileHandler = () => {
        setProfileDrop(!profileDrop);
    };
    const closeHandler = () => {
        setProfileDrop(false);
    };

    return (
        <>
            <div
                className={cx(
                    isTransparent
                        ? classes.transparent
                        : classes.Topbar,
                    { opaqueHeader: triggered }
                )}
            >
                <div className="row">
                    <div className={classes.content}>
                        <div className={classes.logo}>
                            <Link
                                to={'/'}
                            >
                                {isTransparent ? (
                                    <img src={logo2} alt="logo" />
                                ) : (
                                    <img src={logo} alt="logo" />
                                )}
                            </Link>
                        </div>
                        <TopSearch
                            initialTrigger={inTour || inMakeTour}
                            transparent={isTransparent} />
                        <Navigation
                            transparent={isTransparent}
                            isLogged={props.isLogged}
                            profileHandler={profileHandler}
                            profileDrop={profileDrop}
                            handleClose={closeHandler}
                            loginModal={props.onLogin}
                            signUpModal={props.onSignUp}
                            name={props.name}
                            photo={props.photo}/>
                    </div>
                </div>
            </div>
            {!initialTrigger && <div className={classes.relative} />}
        </>
    );
}

export default Topbar;
