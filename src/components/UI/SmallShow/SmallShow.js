import React, { useRef, useState } from "react";
import classes from './SmallShow.module.css';
import OutsideAlerter from "../../../hocs/EventDelegator";
import { CSSTransition } from "react-transition-group";
import './animation.css';

const SmallShow = props => {
    const [ show, setShow ] = useState(false);
    const nodeRef = useRef(null);

    return (
        <div className={classes.main}>
            <OutsideAlerter delegate={props.showIn ? () => props.showIn[1](false) : () => setShow(false)}>
                <button
                        className={classes.button}
                        onClick={(e) => {
                            e.preventDefault();
                            if (props.showIn) {
                                props.showIn[1](!props.showIn[0])
                            } else {
                                props.handler(setShow, show)
                            }
                        }}>
                    {props.button || (
                        'Show'
                    )}
                </button>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={props.showIn ? props.showIn[0] : show}
                    timeout={400}
                    classNames='smallShow'
                    unmountOnExit
                >
                    <div className={props.className ? props.className : classes.content} ref={nodeRef}>
                        {props.children}
                    </div>
                </CSSTransition>
            </OutsideAlerter>
        </div>
    )
}

export default SmallShow