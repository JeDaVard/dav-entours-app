import React from 'react';
import { Link } from "react-router-dom";
import classes from "./DiscoverItem.module.css";
import parentClasses from './Discover.module.css';
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

export default ({ tour }) => (
    <div className={classes.Discover__post}>
        <Link to={loc => {
            return {pathname: `/tour/${tour.slug}`}
        }}>
            <div className={classes.Discover__imageBox}>
                <div className={parentClasses.Discover__imageBetween}>
                    <div className={classes.Discover__image}>
                        <ThumbedImage
                            src={tour.imageCover}
                            className={classes.Discover__img}
                            alt={tour.name}
                            blur
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