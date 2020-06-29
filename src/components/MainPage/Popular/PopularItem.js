import React from 'react';
// import { Link } from 'react-router-dom';
import PreloadLink from './PreloadLink'
import classes from './PopularItem.module.css';
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";
import {FETCH_TOUR} from "../../../containers/TourContainer/queries";
import {FETCH_USER} from "../../../containers/UserContainer/queries";

export default ({ popular }) => {
    return (
        <div className={classes.Popular__tourcontainer}>
            <div className={classes.Popular__tour}>
                <div className={classes.Popular__imageFrame}>
                    <PreloadLink
                        to={`/tour/${popular.slug}`}
                        id={popular.slug}
                        query={FETCH_TOUR}
                    >
                        <ThumbedImage
                            src={popular.imageCover}
                            className={classes.Popular__image}
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
                    <div className={classes.Popular__price}>
                        <h3>${popular.price}</h3>
                        <p>{popular.duration} days</p>
                    </div>
                    <PreloadLink
                        to={`/tour/${popular.slug}`}
                        id={popular.slug}
                        query={FETCH_TOUR}
                    >
                        <div className={classes.Popular__title}>
                            <b>{popular.name}</b>
                        </div>
                    </PreloadLink>
                </div>
                <div className={classes.Popular__bottom}>
                    <PreloadLink
                        to={`/user/${popular.author._id}`}
                        id={popular.author._id}
                        query={FETCH_USER}
                        className={classes.Popular__user}
                     >
                        <img
                            src={`${process.env.REACT_APP_SERVER}/images/user/${popular.author.photo}`}
                            alt="user"
                        />
                        <p>{popular.author.name}</p>
                    </PreloadLink>
                    <div className={classes.Popular__loc}>
                        {popular.startLocation.description}
                    </div>
                </div>
            </div>
        </div>
    );
};
