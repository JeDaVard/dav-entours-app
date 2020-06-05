import React from "react";
import classes from './Error.module.css';
import './animation.css';
import {CSSTransition} from "react-transition-group";

function Error(props) {
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="error"
            unmountOnExit
        >
            <div className={classes.Error__frame} >
                <div className={classes.Error} >
                    <div className="row">
                        <div className={classes.Error__content} >
                            <h4>{props.children}</h4>
                            <button onClick={props.onClose}><div>&times;</div></button>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Error;