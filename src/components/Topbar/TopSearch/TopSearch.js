import React from "react";
import { connect } from 'react-redux';
import withScroll from "../../../hocs/withScroll";
import classes from './TopSearch.module.css';
import sprite from '../../../assets/icons/sprite.svg'

function TopSearch(props) {
    const show = props.inTour || props.triggered || props.isMobile
    return (
        <>
            {show &&
                <div className={classes.TopSearch}>
                    <div className={classes.TopSearch__block} role="search">
                        <button className={classes.TopSearch__button} data-index="0" type="button">
                            <span className={classes.TopSearch__buttonName}>Location</span>
                            Location
                        </button>
                        <span className={classes.TopSearch__separator}> </span>
                        <button className={classes.TopSearch__button} data-index="1" type="button">
                    <span
                        className={classes.TopSearch__buttonName}>Check in / Check out</span>
                            Dates
                        </button>
                        <span className={classes.TopSearch__separator}> </span>
                        <button className={classes.TopSearch__button} data-index="2" type="button">
                            <span className={classes.TopSearch__buttonName}>Participants</span>
                            Participants
                        </button>
                        <span className={classes.TopSearch__separator}> </span>
                        <button className={classes.TopSearch__searchButton} aria-label="Search" type="button">
                            <svg className={classes.TopSearch__searchIcon}>
                                <use href={sprite + '#icon-search'} />
                            </svg>
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