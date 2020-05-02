import React, {useState, useEffect} from "react";
import classes from './Topbar.module.css';
import logo from './entours.png'
import Navigation from "./Navigation/Navigation";

function Topbar() {
    const [ headerShadow, setHeaderShadow ] = useState(classes.headerShadow);
    let shadowInterval;
    const shadowHandler = function(){
        shadowInterval = setInterval(() => {
            if (window.scrollY > 10 && window.scrollY < 200) {
                setHeaderShadow(classes.headerShadow)
            } else if (window.scrollY < 10) {
                setHeaderShadow('')
                clearInterval(shadowInterval)
            }
        }, 500)
    }
    useEffect(() => {
        window.addEventListener('scroll', shadowHandler)

        return () => {
            window.removeEventListener('scroll', shadowHandler)
            clearInterval(shadowInterval)
        }
    }, [])

    return (
        <header className={`${classes.Topbar} ${headerShadow}`}>
            <div className="row">
                <div className={classes.Topbar__content}>
                    <div className={classes.Topbar__logo}>
                        <img src={logo} alt="logo" />
                    </div>
                    <Navigation />
                </div>
            </div>
        </header>
    )
}

export default Topbar