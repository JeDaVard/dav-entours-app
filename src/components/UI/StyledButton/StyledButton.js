import React, { useState } from 'react';
import classNames from 'classnames/bind'
import classes from './StyledButton.module.css'
import { Link } from "react-router-dom";
import DotLoading from "../DotLoading/DotLoading";
import ButtonLoading from "../ButtonLoading/ButtonLoading";

const cx = classNames.bind(classes)

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
    const opacity = props.loading ? { opacity: 0 } : null;

    const button = (
        <>
            <span className={classes.effectContainer}>
                <span onMouseMove={mouseMoveHandler} style={styles} className={classes.effect} />
            </span>
            <span className={classes.text}>
                <span style={opacity}>{props.children}</span>
                {props.loading && <ButtonLoading />}
                </span>
        </>
    )
    return (
        <>
            {
                !props.to ? (
                    <button className={cx(classes.StyledButton, {
                        [classes.round]: props.round,
                        [classes.rounded]: props.rounded
                    })} disabled={props.disabled} onClick={props.onClick}>
                        {button}
                    </button>
                ) : (
                    <Link className={cx(classes.StyledButton, {
                        [classes.round]: props.round,
                        [classes.rounded]: props.rounded
                    })} to={props.to} style={{color: 'white'}}>
                        {button}
                    </Link>
                )
            }
        </>
    );
}

export default StyledButton
