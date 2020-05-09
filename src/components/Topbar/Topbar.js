import React, {useState, useEffect} from "react";
import classes from './Topbar.module.css';
import logo from './entours.png'
import logo2 from './entours2.png'
import Navigation from "./Navigation/Navigation";

function Topbar(props) {
    const initialTransparency = props.transparent ? window.scrollY === 0 : false;

    const [ headerTransparent, setHeaderTransparent ] = useState(initialTransparency)
    const [ headerShadow, setHeaderShadow ] = useState('');
    const [ profileDrop, setProfileDrop ] = useState(false)

    const profileHandler = (e) => {
        setProfileDrop(!profileDrop)
    }
    const closeHandler = () => {
        setProfileDrop(false)
    }

    let shadowInterval;
    const shadowHandler = function(){
        shadowInterval = setInterval(() => {
            if (window.scrollY > 0) {
                if (!props.transparent) {
                    setHeaderShadow(classes.headerShadow)
                } else {
                    setHeaderShadow(classes.headerShadow)
                    setHeaderTransparent(false)
                }
            } else if (window.scrollY < 1) {
                if (!props.transparent) {
                    setHeaderShadow(``)
                } else {
                    setHeaderShadow(``);
                    setHeaderTransparent(true)
                }
                clearInterval(shadowInterval)
            }
        }, 100)
    }
    useEffect(() => {
        window.addEventListener('scroll', shadowHandler)

        return () => {
            window.removeEventListener('scroll', shadowHandler)
            clearInterval(shadowInterval)
        }
    }, [])

    return (
        <>
            <div className={`${!headerTransparent ? classes.Topbar__blur : classes.Topbar__blur + ' ' + classes.Topbar__blur__transparent}`}></div>
            <div className={`${!headerTransparent ? classes.Topbar : classes.Topbar__transparent} ${headerShadow}`}>
                <div className="row">
                    <div className={classes.Topbar__content}>
                        <div className={classes.Topbar__logo}>
                            {!headerTransparent ? <img src={logo} alt="logo" /> : <img src={logo2} alt="logo" />}
                        </div>
                        <Navigation
                            transparent={headerTransparent}
                            isLogged={props.isLogged}
                            profileHandler={profileHandler}
                            profileDrop={profileDrop}
                            handleClose={closeHandler}
                            loginModal={props.onLogin}
                            signUpModal={props.onSignUp}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topbar