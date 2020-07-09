import React, { useState } from 'react';
import withScroll from '../../hocs/withScroll';
import classNames from 'classnames/bind';
import classes from './Topbar.module.css';
import logo from './entours.png';
import logo2 from './entours2.png';
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import TopSearch from './TopSearch/TopSearch';

function Topbar(props) {
    const inTour = !!props.location.pathname.match(/^\/tour\/.*/) || !!props.location.pathname.match(/^\/make.*/);
    const isTransparent = inTour && !props.triggered;
    const cx = classNames.bind(classes);

    const [profileDrop, setProfileDrop] = useState(false);
    const [geoDrop, setGeoDrop] = useState(false);

    const profileHandler = () => {
        setProfileDrop(!profileDrop);
    };
    const closeHandler = () => {
        setProfileDrop(false);
    };
    const geoHandler = () => {
        setGeoDrop(!geoDrop);
    };
    const closeGeoHandler = () => {
        setGeoDrop(false);
    };

    return (
        <>
            <div
                className={cx(
                    isTransparent
                        ? classes.transparent
                        : classes.Topbar,
                    { opaqueHeader: props.triggered }
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
                        <TopSearch inTour={inTour} />
                        <Navigation
                            transparent={isTransparent}
                            isLogged={props.isLogged}
                            profileHandler={profileHandler}
                            profileDrop={profileDrop}
                            handleClose={closeHandler}
                            geo={geoDrop}
                            geoHandler={geoHandler}
                            closeGeo={closeGeoHandler}
                            loginModal={props.onLogin}
                            signUpModal={props.onSignUp}
                            name={props.name}
                            photo={props.photo}
                        />
                    </div>
                </div>
            </div>
            {!inTour && <div className={classes.relative} />}
        </>
    );
}

export default withScroll(Topbar);
