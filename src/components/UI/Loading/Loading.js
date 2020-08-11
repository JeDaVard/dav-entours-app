import React from "react";
import classes from './Loading.module.css';

function Loading(props) {
    const loading = (
        <div className={!props.white ? classes.Loading : classes.white} >
            <div />
            <div />
            <div />
            <div />
        </div>
    )
    return (
        <>
            {props.button
            ? <div className={props.abscenter && classes.center}>
                    <div className={classes.button}>
                        {loading}
                    </div>
                </div>
            : <div className={props.abscenter && classes.center}>
                    {loading}
                </div>}
        </>
    )
}

export default Loading;