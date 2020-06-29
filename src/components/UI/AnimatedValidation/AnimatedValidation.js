import React from "react";
import { CSSTransition } from "react-transition-group";
import classes from './AnimatedValidation.module.css';
import './animation.css';

function AnimatedValidation(props) {
    return (
        <CSSTransition
            in={props.startCondition}
            timeout={400}
            classNames='invalid'
            unmountOnExit
        >
            <p className={classes.invalid}>
                {props.children}
            </p>
        </CSSTransition>
    )
}

export default AnimatedValidation