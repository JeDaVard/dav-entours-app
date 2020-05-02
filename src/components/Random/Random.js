import React from "react";
import classes from './Random.module.css';

function Random() {
    return (
        <section className={classes.Random}>
            <div className="row">
                <div className={classes.Random__top}>
                    <div className={classes.Random__title}>
                        <h2>Introducing Best Tours</h2>
                        <p>Now you can meet people all over the world while trying something new. Join live, interactive video sessions led by expert hosts—all without leaving home.</p>
                    </div>
                    <div className={classes.Random__button}>
                        <button>Expend All</button>
                    </div>
                </div>
                <div className={classes.Random__grid}>
                    <div className={`${classes.Random__post} ${classes.post1}`}></div>
                    <div className={`${classes.Random__post} ${classes.post2}`}></div>
                    <div className={`${classes.Random__post} ${classes.post3}`}></div>
                    <div className={`${classes.Random__post} ${classes.post4}`}></div>
                </div>
            </div>
        </section>
    )
}

export default Random