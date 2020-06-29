import React from "react";
import classes from './Loading.module.css';

function Loading(props) {
    const loading = (
        <div className={!props.white ? classes.Loading : classes.Loading__white} >
            <div />
            <div />
            <div />
            <div />
        </div>
    )
    return (
        <>
            {props.button
            ? <div className={props.abscenter && classes.Loading__center}>
                    <div className={classes.Loading__button}>
                        {loading}
                    </div>
                </div>
            : <div className={props.abscenter && classes.Loading__center}>
                    {loading}
                </div>}
        </>
    )
}

export default Loading;