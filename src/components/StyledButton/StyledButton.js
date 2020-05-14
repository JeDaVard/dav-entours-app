import React, { useState } from 'react';
import classes from './StyledButton.module.css'

function StyledButton(props) {
    const [ styles, setStyles ] = useState({})

    const mouseMoveHandler = e => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        setStyles({
            backgroundPosition: "calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%)",
            "--mouse-x": x / (e.target.clientWidth / 100),
            "--mouse-y": y * 2.25,
        })
    }
    return (
        <button className={classes.StyledButton}>
            <span className={classes.StyledButton__effectContainer}>
                <span onMouseMove={mouseMoveHandler} style={styles} className={classes.StyledButton__effect}> </span>
            </span>
            <span className={classes.StyledButton__text}>
                {props.children}
                </span>
        </button>
    );
}

export default StyledButton
