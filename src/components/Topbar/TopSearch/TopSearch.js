import React from "react";
import classes from './TopSearch.module.css';
import sprite from '../../../assets/icons/sprite.svg'

function TopSearch() {
    return (
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
    )
}

export default TopSearch