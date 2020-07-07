import React, {useRef} from "react";
import classes from './Error.module.css';
import './animation.css';
import {CSSTransition} from "react-transition-group";
import Justicon from "../../components/UI/JustIcon/Justicon";

function Error(props) {
    const ref = useRef(null);

    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            nodeRef={ref}
            classNames="error"
            unmountOnExit
        >
            <div className={classes.frame} ref={ref}>
                <div className={classes.Error} >
                    <div className="row">
                        <div className={classes.content} >
                            <h4>{props.children}</h4>
                            <button onClick={props.onClose}>
                                <Justicon icon={'x'} className={classes.closeIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Error;