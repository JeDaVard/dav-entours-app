import React from "react";
import classes from './Popular.module.css';

function Popular() {
    return (
        <section className={classes.Popular}>
            <div className={classes.Popular__tour}>
                <div className={classes.Popular__image}>
                    <img src="" alt="title"/>
                </div>
                <div className={classes.Popular__title}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </div>
            </div>
            <div className={classes.Popular__tour}>
                <div className={classes.Popular__image}>
                    <img src="" alt="title"/>
                </div>
                <div className={classes.Popular__title}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </div>
            </div>
            <div className={classes.Popular__tour}>
                <div className={classes.Popular__image}>
                    <img src="" alt="title"/>
                </div>
                <div className={classes.Popular__title}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </div>
            </div>
        </section>
    )
}

export default Popular