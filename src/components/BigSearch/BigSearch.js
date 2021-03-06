import React, {useRef} from "react";
import classes from './BigSearch.module.css';
import Navigation from "../Navigation/Navigation";
import Search from "../../features/Search/Search";
import {CSSTransition} from "react-transition-group";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import './_animation.css';

export default function BigSearch(props) {
    const [ trigger ] = useScrollTrigger({changePoint: 10})
    const ref = useRef(null);

    return (
        <CSSTransition
            nodeRef={ref}
            in={!trigger || props.forced}
            timeout={320}
            classNames="bigSearch"
            unmountOnExit
        >
            <div className={classes.bigSearch} ref={ref}>
                <div className={classes.navigation}>
                    <Navigation searching={props.forced}/>
                </div>
                <div className={classes.container}>
                    <Search searching={props.forced} closeSearch={props.setForce}/>
                </div>
            </div>
        </CSSTransition>
    )
}