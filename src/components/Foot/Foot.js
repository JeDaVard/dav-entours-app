import React from "react";
import classes from './Foot.module.css';

function Foot() {
    return (
        <footer className={classes.Foot}>
            <div className="row">
                <div className={classes.Foot__content}>
                    <div className={classes.Foot__col}>
                        <ul>
                            <h3 className={classes.Foot__title}>About</h3>
                            <li><a href="">Accessibility</a></li>
                            <li><a href="">Trust & Safety</a></li>
                            <li><a href="">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.Foot__col}>
                        <ul>
                            <h3 className={classes.Foot__title}>About</h3>
                            <li><a href="">Accessibility</a></li>
                            <li><a href="">Trust & Safety</a></li>
                            <li><a href="">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.Foot__col}>
                        <ul>
                            <h3 className={classes.Foot__title}>About</h3>
                            <li><a href="">Accessibility</a></li>
                            <li><a href="">Trust & Safety</a></li>
                            <li><a href="">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.Foot__col}>
                        <ul>
                            <h3 className={classes.Foot__title}>About</h3>
                            <li><a href="">Accessibility</a></li>
                            <li><a href="">Trust & Safety</a></li>
                            <li><a href="">Newsroom</a></li>
                        </ul>
                    </div>
                </div>
                <div className={classes.Foot__bottom}>
                    <div className={classes.Foot__rules}>
                        <p>copyright</p>
                    </div>
                    <div className={classes.Foot__right}>
                        <div className={classes.Foot__geo}>
                            <p>currency</p>
                        </div>
                        <div className={classes.Foot__social}>
                            <p className={classes.Foot__socialIcon}>instagram</p>
                            <p className={classes.Foot__socialIcon}>facebook</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Foot