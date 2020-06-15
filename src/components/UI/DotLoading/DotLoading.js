import React from "react";
import classes from './DotLoading.module.css'

function DotLoading() {
    return (
        <div className={classes.loading} >
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default DotLoading