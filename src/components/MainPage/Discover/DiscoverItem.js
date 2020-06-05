import React from 'react';
import { Link } from "react-router-dom";
import classes from "./DiscoverItem.module.css";
import parentClasses from './Discover.module.css';

export default ({ tour }) => (
    <div className={classes.Discover__post}>
        <Link to={loc => {
            return {pathname: `/tour/${tour.slug}`, state: tour}
        }}>
            <div className={classes.Discover__imageBox}>
                <div className={parentClasses.Discover__imageBetween}>
                    <div className={classes.Discover__image}>
                        <img
                            className={classes.Discover__img}
                            src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`}
                            alt="tour"
                        />
                    </div>
                </div>
                <div className={classes.Discover__bottom}>
                    <div className={classes.Discover__title}>
                        <h2>{tour.name}</h2>
                        <p>{tour.summary}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
)