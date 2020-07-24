import React from 'react';
import { Link } from "react-router-dom";
import classes from "./DiscoverItem.module.css";
import parentClasses from './Discover.module.css';
import ThumbedImage from "../../../components/UI/ImageLoading/ThumbedImage";

export default ({ tour }) => (
    <div className={classes.post}>
        <Link to={`/tour/${tour.slug}`}>
            <div className={classes.imageBox}>
                <div className={parentClasses.imageBetween}>
                    <div className={classes.image}>
                        <ThumbedImage
                            src={tour.imageCover}
                            className={classes.img}
                            alt={tour.name}
                            blur
                        />
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.title}>
                        <h2>{tour.name}</h2>
                        <p>{tour.summary}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
)