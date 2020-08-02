import React, {useState} from 'react';
import classNames from 'classnames/bind';
import classes from './Topbar.module.css';
// import logo from '../../assets/img/entours.png';
import logo from '../../assets/img/entours.svg';
// import logo from '../../assets/img/entours2.png';
import { Link } from 'react-router-dom';
import TopSearch from '../TopSearch/TopSearch';
import useScrollTrigger from "../../hooks/useScrollTrigger";
import BigSearch from "../BigSearch/BigSearch";
import NavProfile from "../NavProfile/NavProfile";
import Logo from "../UI/Logo/Logo";

const cx = classNames.bind(classes);

function Topbar(props) {
    const inTour = !!props.location.pathname.match(/^\/tour\/.*/);
    const inMakeTour = !!props.location.pathname.match(/^\/make.*/);
    const inMain = props.location.pathname === '/'
    const initialTrigger = inTour || inMain || inMakeTour

    const [ searching, setSearching ] = useState(false)

    const [ triggered, setTriggered ] = useScrollTrigger({changePoint: inMain ? 480 : 10});

    const isTransparent = initialTrigger && !triggered;

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
                                <BigSearch forced={searching} />
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
