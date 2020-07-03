import React, {useRef} from "react";
import { CSSTransition } from "react-transition-group";
import classes from './AnimatedValidation.module.css';
import './animation.css';

function AnimatedValidation(props) {
    const ref = useRef(null);

    return (
        <CSSTransition
            nodeRef={ref}
            in={props.startCondition}
            timeout={400}
            classNames='invalid'
            unmountOnExit
        >
            <p className={classes.invalid} ref={ref}>
                {props.children}
            </p>
        </CSSTransition>
    )
}

export default AnimatedValidation