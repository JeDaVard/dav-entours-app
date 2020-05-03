import React from "react";
import classes from './PopDown.module.css';
import user from './user-4.jpg';

function PopDown(props) {
    const show = !props.show ? ` ${classes.hide}` : '';

    return (
        <div className={`${classes.PopDown}${show}`} >
            <div className="row">
                <div className={classes.PopDown__content}>
                    <div className={classes.PopDown__user}>
                        <img src={user} alt="user"/>
                        <h3>The Secrets Behind Ladyboys</h3>
                        <p><b>4.7</b> (136)</p>
                    </div>
                    <div className={classes.PopDown__purchase}>
                        <h2>$149 per person</h2>
                        <button>Reserve a place</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopDown