import React from 'react';
// import { Link } from 'react-router-dom';
import PreloadLink from './PreloadLink'
import classes from './PopularItem.module.css';
import ThumbedImage from "../../../components/UI/ImageLoading/ThumbedImage";
import {FETCH_TOUR} from "../../TourContainer/queries";
import {FETCH_USER} from "../../UserPage/queries";

export default ({ popular }) => {
    return (
        <div className={classes.tourContainer}>
            <div className={classes.tour}>
                <div className={classes.imageFrame}>
                    <PreloadLink
                        to={`/tour/${popular.slug}`}
                        id={popular.slug}
                        query={FETCH_TOUR}
                    >
                        <ThumbedImage
                            src={popular.imageCover}
                            className={classes.image}
                            alt={popular.name}
                            blur
                        />
                    </PreloadLink>
                    {new Date() - new Date(popular.createdAt) <
                        30 * 24 * 60 * 60 * 1000 && (
                        <div className={classes.new}>
                            <p>NEW</p>
                        </div>
                    )}
                    <div className={classes.price}>
                        <h3>${popular.price}</h3>
                        <p>{popular.duration} days</p>
                    </div>
                    <PreloadLink
                        to={`/tour/${popular.slug}`}
                        id={popular.slug}
                        query={FETCH_TOUR}
                    >
                        <div className={classes.title}>
                            <b>{popular.name}</b>
                        </div>
                    </PreloadLink>
                </div>
                <div className={classes.bottom}>
                    <PreloadLink
                        to={`/user/${popular.author._id}`}
                        id={popular.author._id}
                        query={FETCH_USER}
                        className={classes.user}
                     >
                        <img
                            src={`${process.env.REACT_APP_SERVER}/images/user/${popular.author.photo}`}
                            alt="user"
                        />
                        <p>{popular.author.name}</p>
                    </PreloadLink>
                    <div className={classes.loc}>
                        {popular.startLocation.description}
                    </div>
                </div>
            </div>
        </div>
    );
};
