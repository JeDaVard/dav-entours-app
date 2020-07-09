import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PopularItem.module.css';
import ThumbedImage from "../../../components/UI/ImageLoading/ThumbedImage";

export default ({ popular }) => {
    return (
        <div className={classes.tourContainer}>
            <div className={classes.tour}>
                <div className={classes.imageFrame}>
                    <Link
                        to={`/tour/${popular.slug}`}
                    >
                        <ThumbedImage
                            src={popular.imageCover}
                            className={classes.image}
                            alt={popular.name}
                            blur
                        />
                    </Link>
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
                    <Link
                        to={`/tour/${popular.slug}`}
                    >
                        <div className={classes.title}>
                            <b>{popular.name}</b>
                        </div>
                    </Link>
                </div>
                <div className={classes.bottom}>
                    <Link
                        to={`/user/${popular.author._id}`}
                        className={classes.user}
                    >
                        <img
                            src={`${process.env.REACT_APP_SERVER}/images/user/${popular.author.photo}`}
                            alt="user"
                        />
                        <p>{popular.author.name}</p>
                    </Link>
                    <div className={classes.loc}>
                        {popular.startLocation.description}
                    </div>
                </div>
            </div>
        </div>
    );
};
