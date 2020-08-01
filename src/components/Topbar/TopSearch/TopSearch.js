import React, {useRef} from "react";
import { connect } from 'react-redux';
import withScroll from "../../../hocs/withScroll";
import classes from './TopSearch.module.css';
import sprite from '../../../assets/icons/sprite.svg'
import classNames from 'classnames/bind';
import {CSSTransition} from "react-transition-group";
import './_animation.css';

const cx = classNames.bind(classes);

function TopSearch(props) {
    const show = props.initialTrigger || props.triggered || props.isMobile;
    const ref = useRef(null);

    return (
        <>
            <CSSTransition
                nodeRef={ref}
                in={show}
                timeout={100}
                classNames="topSearch"
                unmountOnExit
            >
                <div className={classes.TopSearch} ref={ref}>
                    <div className={cx(classes.block, {[classes.blockBlur]: props.transparent})} role="search">
                        <button className={classes.button}>
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
        </>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile
})

export default connect(mSTP)(withScroll(TopSearch, { changePoint: 86}))