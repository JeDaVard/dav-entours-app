import React from "react";
import classes from './Topbar.module.css';

function Topbar() {
    return (
        <header>
            <div className={classes.Topbar}>
                <div className={classes.Topbar__logo}>
                    <img src="../../../public/logo192.png" alt="logo" />
                </div>
                <div className={classes.Topbar__right}>
                    <div className={classes.Topbar__geo}>
                        <a href="/">Currency</a>
                    </div>
                    <div className={classes.Topbar__menu}>
                        <a href="/">Make a tour</a>
                    </div>
                    <div className={classes.Topbar__user}>
                        <p>User Profile</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topbar