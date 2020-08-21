import React from "react";
import classes from './Become.module.css';
import {Link} from "react-router-dom";

function Become() {
    return (
        <section className={classes.Become}>
            <div className="row">
                <div className={classes.content}>
                    <div className={classes.left}>
                        <div className={classes.proposition}>
                            <h3>Become a tourmaker, Earn from $700 monthly. Communicate with others</h3>
                        </div>
                        <div className={classes.button}>
                            <Link to={'/make'}>Start Now</Link>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <p>No matter what kind of home or tour you have to make, Entours makes it simple and secure to tour from all over the world. You’re in full control of your availability, prices, rules, also you can invite guides to make your tour better.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Become