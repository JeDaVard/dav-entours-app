import React from "react";
import moment from "moment";
import classes from './UserReviews.module.css';
import {Link} from "react-router-dom";
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

const UserReviews = ({ reviews }) => {
    return (
        <section className={classes.stuff}>
            <div className={classes.reviews}>
                <h1>{reviews.length} reviews</h1>

                {reviews.map( review => (
                    <div className={classes.reviewContent} key={review._id}>
                        <div className={classes.participated}>
                            <div>
                                <h6>Participated&nbsp;
                                    <Link to={loc => ({...loc, pathname: `/tour/${review.tour.slug}`})}>
                                        {review.tour.name} tour
                                    </Link>
                                </h6>
                                <h5>{moment(review.createdAt).format('DD MMM YYYY')}</h5>
                            </div>
                            <Link to={loc => ({...loc, pathname: `/tour/${review.tour.slug}`})}>
                                {/*<ThumbedImage*/}
                                {/*    src={review.tour.imageCover}*/}
                                {/*    className={classes.UserReviews__tourImage}*/}
                                {/*    alt={review.tour.name}*/}
                                {/*    blur*/}
                                {/*/>*/}
                                <img src={`${process.env.REACT_APP_CDN}/${review.tour.imageCover}`}
                                     className={classes.UserReviews__tourImage}
                                     alt={review.tour.name}/>
                            </Link>
                        </div>
                        <p>{review.review}</p>
                        <div className={classes.reviewer}>
                            <Link to={{pathname: `/user/${review.author._id}`}}>
                                <img src={`${process.env.REACT_APP_SERVER}/images/user/${review.author.photo}`} alt={review.author.name}/>
                            </Link>
                            <div>
                                <Link to={{pathname: `/user/${review.author._id}`}}>
                                    <p><b>{review.author.name}</b></p>
                                </Link>
                                <p>Joined {moment(review.author.createdAt).format('MMM YYYY')}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default UserReviews