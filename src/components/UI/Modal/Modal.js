import React from "react";
import ReactDOM from 'react-dom'
import classes from './Modal.module.css';
import { CSSTransition } from "react-transition-group";
import BackDrop from "../BackDrop/BackDrop";
import './animation.css';
import Separator from "../Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";

function Modal(props) {
    return ReactDOM.createPortal(
        <>
            <BackDrop  onClick={props.onClick} showBackdrop={props.showBackdrop} />
            <CSSTransition
                in={props.showBackdrop}
                timeout={550}
                classNames='modal'
                unmountOnExit
            >
                <div className={classes.Modal}>
                    <OutsideAlerter delegate={props.onClick}>
                            <header className={classes.header}>
                                <h1>{props.title}</h1>
                                <button onClick={props.onClick}><div>&times;</div></button>
                            </header>
                            <Separator color={'light'}/>
                            <main className={classes.main}>
                                {props.children}
                            </main>
                    </OutsideAlerter>
                </div>
            </CSSTransition>
        </>,
        document.getElementById('modal-root')
    )
}

export default Modal