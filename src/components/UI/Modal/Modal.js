import React, {useEffect, useRef} from "react";
import ReactDOM from 'react-dom'
import classes from './Modal.module.css';
import { CSSTransition } from "react-transition-group";
import BackDrop from "../BackDrop/BackDrop";
import './animation.css';
import Separator from "../Separator/Separator";
import OutsideAlerter from "../../../hocs/EventDelegator";
import Justicon from "../JustIcon/Justicon";

function Modal(props) {
    const { onClick, showBackdrop } = props
    const nodeRef = useRef(null);

    useEffect(() => {
        if (showBackdrop) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showBackdrop])

    const closeModal = () => {
        document.body.style.overflow = 'auto'
        onClick()
    }

    return ReactDOM.createPortal(
        <>
            <BackDrop  onClick={closeModal} showBackdrop={showBackdrop} />
            <CSSTransition
                nodeRef={nodeRef}
                in={showBackdrop}
                timeout={550}
                classNames='modal'
                unmountOnExit
            >
                <div className={classes.Modal} ref={nodeRef}>
                    <OutsideAlerter delegate={closeModal}>
                            <header className={classes.header}>
                                <h1>{props.title}</h1>
                                <button onClick={closeModal}>
                                    <Justicon icon={'x'} className={classes.closeIcon}/>
                                </button>
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