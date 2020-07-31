import React from "react";
import { connect } from 'react-redux';
import withScroll from "../../../hocs/withScroll";
import classes from './TopSearch.module.css';
import sprite from '../../../assets/icons/sprite.svg'
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

function TopSearch(props) {
    const show = props.inTour || props.triggered || props.isMobile
    return (
        <>
            {show &&
                <div className={classes.TopSearch}>
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
            }
        </>
    )
}

const mSTP = s => ({
    isMobile: s.ui.display.isMobile
})

export default connect(mSTP)(withScroll(TopSearch, { changePoint: 86}))