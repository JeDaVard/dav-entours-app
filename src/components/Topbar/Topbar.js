import React, {useState, useEffect} from "react";
import classes from './Topbar.module.css';
import logo from './entours.png'
import logo2 from './entours2.png'
import Navigation from "./Navigation/Navigation";

function Topbar(props) {
    const initialTransparency = window.scrollY === 0;

    const [ headerTransparent, setHeaderTransparent ] = useState(initialTransparency)
    const [ headerShadow, setHeaderShadow ] = useState('');

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
        }, 200)
    }
    useEffect(() => {
        window.addEventListener('scroll', shadowHandler)

        return () => {
            window.removeEventListener('scroll', shadowHandler)
            clearInterval(shadowInterval)
        }
    }, [])

    return (
        <header className={`${!headerTransparent ? classes.Topbar : classes.Topbar__transparent} ${headerShadow}`}>
            <div className="row">
                <div className={classes.Topbar__content}>
                    <div className={classes.Topbar__logo}>
                        {!headerTransparent ? <img src={logo} alt="logo" /> : <img src={logo2} alt="logo" />}
                    </div>
                    <Navigation transparent={headerTransparent}/>
                </div>
            </div>
        </header>
    )
}

export default Topbar