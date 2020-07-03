import React, {useRef} from 'react';
import classes from './BackDrop.module.css';
import { CSSTransition } from 'react-transition-group';
import './animation.css';

const BackDrop = (props) => {
    const ref = useRef(null);

    return (
        <CSSTransition
            nodeRef={ref}
            in={props.showBackdrop}
            timeout={350}
            classNames="backdrop"
            unmountOnExit
        >
            <div ref={ref}
                 className={classes.BackDrop}
                 onClick={props.onClick}
            />
        </CSSTransition>
    )
}

export default BackDrop;
