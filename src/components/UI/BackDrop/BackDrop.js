import React from 'react';
import classes from './BackDrop.module.css';
import { CSSTransition } from 'react-transition-group';
import './animation.css';

const BackDrop = (props) => (
    <CSSTransition
        in={props.showBackdrop}
        timeout={350}
        classNames="backdrop"
        unmountOnExit
    >
        <div
            className={classes.BackDrop}
            onClick={props.onClick}
        />
    </CSSTransition>
);

export default BackDrop;
