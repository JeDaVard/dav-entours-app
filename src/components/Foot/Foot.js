import React from "react";
import classes from './Foot.module.css';
import Separator from "../UI/Separator/Separator";

function Foot() {
    return (
        <div className={classes.Foot}>
            <div className="row">
                <div className={classes.content}>
                    <div className={classes.col}>
                        <ul>
                            <h3 className={classes.title}>About</h3>
                            <li><a href="/">Accessibility</a></li>
                            <li><a href="/">Trust & Safety</a></li>
                            <li><a href="/">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.col}>
                        <ul>
                            <h3 className={classes.title}>About</h3>
                            <li><a href="/">Accessibility</a></li>
                            <li><a href="/">Trust & Safety</a></li>
                            <li><a href="/">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.col}>
                        <ul>
                            <h3 className={classes.title}>About</h3>
                            <li><a href="/">Accessibility</a></li>
                            <li><a href="/">Trust & Safety</a></li>
                            <li><a href="/">Newsroom</a></li>
                        </ul>
                    </div>
                    <div className={classes.col}>
                        <ul>
                            <h3 className={classes.title}>About</h3>
                            <li><a href="/">Accessibility</a></li>
                            <li><a href="/">Trust & Safety</a></li>
                            <li><a href="/">Newsroom</a></li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className={classes.bottom}>
                    <div className={classes.rules}>
                        <p>© 2020 Entours Inc. All rights reserved</p>
                        <ul>
                            &nbsp; · &nbsp;
                            <li><a href="/">Privacy</a></li>
                            &nbsp; · &nbsp;
                            <li><a href="/">Terms</a></li>
                        </ul>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.geo}>
                            <p>currency</p>
                        </div>
                        <div className={classes.social}>
                            <p className={classes.socialIcon}>instagram</p>
                            <p className={classes.socialIcon}>facebook</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Foot