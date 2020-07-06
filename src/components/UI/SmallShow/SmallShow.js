import React, {useRef, useState} from "react";
import classes from './SmallShow.module.css';
import OutsideAlerter from "../../../hocs/EventDelegator";
import {CSSTransition} from "react-transition-group";
import './animation.css';

const SmallShow = props => {
    const [ show, setShow ] = useState(false);
    const nodeRef = useRef(null);

    return (
        <div className={classes.main}>
            <OutsideAlerter delegate={() => setShow(false)}>
            <button
                    className={classes.button}
                    onClick={() => props.handler(setShow, show)}>
                {props.button || (
                    'Show'
                )}
            </button>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={show}
                    timeout={400}
                    classNames='smallShow'
                    unmountOnExit
                >
                    <div className={classes.content} ref={nodeRef}>
                        {props.children}
                    </div>
                </CSSTransition>
                </OutsideAlerter>
        </div>
    )
}

export default SmallShow