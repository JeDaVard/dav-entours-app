import React from "react";
import classes from './MainHead.module.css';

export default function MainHead() {
    return (
        <div className={classes.MainHead}>
            <div className="row">
                <div className={classes.headCall}>
                    <div className={classes.title}>
                        <h1>Get out and stretch your imagination</h1>
                    </div>
                    <div className={classes.description}>
                        <h4>Take a tour, go find a world of wonder, discover our home planet.</h4>
                    </div>
                    <div className={classes.button}>
                        <button>Explore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}