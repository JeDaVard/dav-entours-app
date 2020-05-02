import React from "react";
import classes from './Top.module.css';

function Top() {
    return (
        <section className={classes.Top}>
            <div className="row">
                <div className={classes.Top__content}>
                    <div className={classes.Top__title}>
                        <h3>Top tourmakers</h3>
                        <p>Monthly most active tourmaker</p>
                    </div>
                    <div className={classes.Top__content}>
                        Info surf
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Top