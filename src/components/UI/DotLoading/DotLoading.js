import React from "react";
import classes from './DotLoading.module.css'

function DotLoading(props) {
    return (
        <div className={props.small ? classes.loadingSmall : classes.loading} >
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default DotLoading