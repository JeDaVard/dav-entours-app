import React, { useState, useEffect } from "react";
import classes from './Topbar.module.css';
import logo from './entours.png'
import logo2 from './entours2.png'
import Navigation from "./Navigation/Navigation";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopSearch from "./TopSearch/TopSearch";


function Topbar(props) {
    console.log(props)
    const isTransparent = !!props.location.pathname.match(/^\/tour\/.*/);
    const initialTopBar = {
        topSearch: false,
        transparent: isTransparent ? window.scrollY === 0 : false,
        shadow: ''
    };
    const [ topBar, setTopBar ] = useState(initialTopBar)

    const [ profileDrop, setProfileDrop ] = useState(false);
    const [ geoDrop, setGeoDrop ] = useState(false);

    const profileHandler = () => {
        setProfileDrop(!profileDrop)
    }
    const closeHandler = () => {
        setProfileDrop(false)
    }
    const geoHandler = () => {
        setGeoDrop(!geoDrop)
    }
    const closeGeoHandler = () => {
        setGeoDrop(false)
    }

    const topBarHandler = function() {
        if (!isTransparent) {
            if (window.scrollY < 1) {
                setTopBar(state => ({
                    ...state,
                    transparent: false,
                    shadow: ''
                }))
            } else {
                setTopBar( state => ({
                    ...state,
                    shadow: classes.headerShadow
                }))
            }
        } else {
            if (window.scrollY < 1) {
                setTopBar(state => ({
                    ...state,
                    transparent: true,
                    shadow: ''
                }))
            } else {
                setTopBar(state => ({
                    ...state,
                    transparent: false,
                    shadow: classes.headerShadow
                }))
            }
        }
    }

    useEffect(() => {
        if (window.scrollY > 90 && !topBar.topSearch) {
            setTopBar(state => ({
                ...state,
                topSearch: true
            }))
        } else if (window.scrollY <= 90 && topBar.topSearch) {
            setTopBar(state => ({
                ...state,
                topSearch: false
            }))
        }
    }, [window.scrollY])

    useEffect(() => {
        topBarHandler()
    }, [isTransparent])

    useEffect(() => {
        window.addEventListener('scroll', topBarHandler)

        return () => {
            window.removeEventListener('scroll', topBarHandler)
        }
    }, [isTransparent])

    return (
        <>
            <div
                className={`${
                    !topBar.transparent
                        ? classes.Topbar
                        : classes.Topbar__transparent
                } ${topBar.shadow}`}
            >
                <div className="row">
                    <div className={classes.Topbar__content}>
                        <div className={classes.Topbar__logo}>
                            <Link
                                to={(loc) => ({
                                    ...loc,
                                    pathname: '/',
                                    state: {
                                        ...loc.state,
                                        fromTransparentTopPage: !!loc.pathname.match(/^\/tour\/.*/)
                                    },
                                })}
                            >
                                {!topBar.transparent ? (
                                    <img src={logo} alt="logo" />
                                ) : (
                                    <img src={logo2} alt="logo" />
                                )}
                            </Link>
                        </div>
                        {(props.location.pathname.startsWith('/tour') || topBar.topSearch) && <TopSearch />}
                        <Navigation
                            transparent={topBar.transparent}
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
            {!isTransparent && (
                <div className={classes.Topbar__relative} />
            )}
        </>
    );
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Topbar)