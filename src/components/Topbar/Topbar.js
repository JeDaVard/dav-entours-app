import React, {useRef, useState} from 'react';
import classNames from 'classnames/bind';
import classes from './Topbar.module.css';
import TopSearch from '../TopSearch/TopSearch';
import useScrollTrigger from "../../hooks/useScrollTrigger";
import BigSearch from "../BigSearch/BigSearch";
import NavProfile from "../NavProfile/NavProfile";
import Logo from "../UI/Logo/Logo";
import {CSSTransition} from "react-transition-group";
import './_animations.css'

const cx = classNames.bind(classes);

function Topbar(props) {
    const inTour = !!props.location.pathname.match(/^\/tour\/.*/) || !! props.location.pathname.match(/^\/tours\/.*/);
    const inMakeTour = !!props.location.pathname.match(/^\/make.*/);
    const inMain = props.location.pathname === '/'
    const initialTrigger = inTour || inMain || inMakeTour

    const [ searching, setSearching ] = useState(false);

    const ref = useRef(null);

    const [ triggered ] = useScrollTrigger({changePoint: inMain ? 480 : 10});

    const isTransparent = initialTrigger && !triggered && !searching;

    const openBigHandler = () => {
        setSearching(true)
    }
    const closeBigHandler = () => {
        setSearching(false)
    }

    useState(() => {
        window.addEventListener('scroll', closeBigHandler);
        return () => {
            window.removeEventListener('scroll', closeBigHandler);
        }
    })

    return (
        <>
            <CSSTransition
                nodeRef={ref}
                in={searching}
                timeout={310}
                classNames="searchBlur"
                unmountOnExit
            >
                <div ref={ref} onClick={closeBigHandler} className={classes.searchBlur}/>
            </CSSTransition>
            <div
                className={cx(
                    isTransparent
                        ? classes.transparent
                        : classes.Topbar,
                    { opaqueHeader: triggered, searchHeader: searching }
                )}
            >
                <div className="row">
                    <div className={classes.content}>
                        <div className={classes.logoFrame}>
                            <Logo primary={isTransparent}/>
                        </div>
                        <TopSearch
                            openBigSearch={openBigHandler}
                            initialTrigger={inTour || inMakeTour}
                            forced={searching}
                            transparent={isTransparent} />
                        {(inMain || searching) && (
                            <div className={classes.search}>
                                <BigSearch forced={searching} setForce={setSearching}/>
                            </div>
                        )}
                        <NavProfile
                            transparent={isTransparent}
                            isLogged={props.isLogged}
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
