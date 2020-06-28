import React from "react";
import classes from './UserListings.module.css'
import {Link} from "react-router-dom";
import moment from "moment";
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

const UserListings = ({ tours }) => {
    return (
        <section className={classes.UserPage__stuff}>
            <div className={classes.UserPage__listingSection}>
                <h1>Tour listings</h1>
                <div className={classes.UserPage__listings}>

                    {tours.map(tour => (
                        <div className={classes.UserPage__listing} key={tour._id}>
                            <Link to={{pathname: `/tour/${tour.slug}`}}>
                                <div className={classes.UserPage__listingImageFrame}>
                                    <ThumbedImage
                                        src={tour.imageCover}
                                        className={classes.UserPage__listingImage}
                                        alt={tour.name}
                                        blur
                                    />
                                </div>
                            </Link>
                            <div className={classes.UserPage__listingTitle}>
                                <Link to={{pathname: `/tour/${tour.slug}`}}>
                                <h2>{tour.name.length > 34 ? tour.name.slice(0,34)+'...' : tour.name}</h2>
                                </Link>
                                <div className={classes.UserPage__listingTitleRight}>
                                    <p><b>{tour.ratingsAverage}</b></p><p>({tour.ratingsQuantity})</p>
                                </div>
                            </div>
                            <div className={classes.UserPage__listingInfo}>
                                <div>
                                    <p><b>{tour.participants.length}</b>/{tour.maxGroupSize}</p>
                                </div>
                                <div>
                                    <p>{moment(+tour.startDates[0]).format('dd DD MMM YYYY')}</p>
                                </div>
                                <div>
                                    <p>{tour.startLocation.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default UserListings