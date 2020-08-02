import React, { useRef } from "react";
import { useSelector } from 'react-redux';
import classes from './TopSearch.module.css';
import sprite from '../../assets/icons/sprite.svg'
import classNames from 'classnames/bind';
import {CSSTransition} from "react-transition-group";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import './_animation.css';

const cx = classNames.bind(classes);

function TopSearch(props) {
    const ref = useRef(null);
    const isMobile = useSelector(s => s.ui.display.isMobile)
    const [ triggered ] = useScrollTrigger({ changePoint: 10})

    const show = (props.initialTrigger || triggered || isMobile) && !props.forced;

    return (
        <CSSTransition
            nodeRef={ref}
            in={show}
            timeout={320}
            classNames="topSearch"
            unmountOnExit
        >
            <div className={classes.TopSearch} ref={ref}>
                <div className={cx(classes.block, {[classes.blockBlur]: props.transparent})} role="search">
                    <button className={classes.button} onClick={props.openBigSearch}>
                        <div className={classes.text}>Start your search</div>
                        <div className={classes.iconFrame}>
                            <svg className={classes.icon}>
                                <use href={sprite + '#icon-search'} />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </CSSTransition>
    )
}

export default TopSearch