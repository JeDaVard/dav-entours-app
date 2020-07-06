import React from "react";
import classes from './UserListings.module.css'
import {Link} from "react-router-dom";
import moment from "moment";
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

const UserListings = ({ tours }) => {
    return (
        <section className={classes.stuff}>
            <div className={classes.listingSection}>
                <h1>Tour listings</h1>
                <div className={classes.listings}>

                    {tours.map(tour => (
                        <div className={classes.listing} key={tour._id}>
                            <Link to={{pathname: `/tour/${tour.slug}`}}>
                                <div className={classes.listingImageFrame}>
                                    <ThumbedImage
                                        src={tour.imageCover}
                                        className={classes.listingImage}
                                        alt={tour.name}
                                        blur
                                    />
                                </div>
                            </Link>
                            <div className={classes.listingTitle}>
                                <Link to={{pathname: `/tour/${tour.slug}`}}>
                                <h2>{tour.name.length > 28 ? tour.name.slice(0,25)+'...' : tour.name}</h2>
                                </Link>
                                <div className={classes.listingTitleRight}>
                                    <p><b>{tour.ratingsAverage}</b></p><p>({tour.ratingsQuantity})</p>
                                </div>
                            </div>
                            <div className={classes.listingInfo}>
                                <div>
                                    <p>
                                        <b>{tour.starts.length ? tour.starts[0].participants.length : '0'}</b>
                                        /{tour.maxGroupSize}</p>
                                </div>
                                <div>
                                    <p>{tour.starts.length ? moment(+tour.starts[0].date).format('dd, DD MMM YYYY') : 'Coming soon!'}</p>
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