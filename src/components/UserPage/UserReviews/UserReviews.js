import React from "react";
import moment from "moment";
import classes from './UserReviews.module.css';
import {Link} from "react-router-dom";

const UserReviews = ({ reviews, loading }) => {
    console.log(reviews)
    return (
        <section className={classes.UserPage__stuff}>
            <div className={classes.UserPage__reviews}>
                <h1>{reviews.length} reviews</h1>

                {!loading && (
                    reviews.map( review => (
                        <div className={classes.UserPage__reviewContent} key={review._id}>
                            <div className={classes.UserPage__participated}>
                                <div>
                                    <h6>Participated&nbsp;
                                        <Link to={{pathname: `/tour/${review.participated.slug}`}}>
                                            {review.participated.name} tour
                                        </Link>
                                    </h6>
                                    <h5>{moment(review.createdAt).format('DD MMM YYYY')}</h5>
                                </div>
                                <Link to={{pathname: `/tour/${review.participated.slug}`}}>
                                    <img src={`http://localhost:5000/images/tour/${review.participated.image}`} alt={review.participated.name}/>
                                </Link>
                            </div>
                            <p>{review.review}</p>
                            <div className={classes.UserPage__reviewer}>
                                <Link to={{pathname: `/user/${review.author._id}`}}>
                                    <img src={`http://localhost:5000/images/user/${review.author.photo}`} alt={review.author.name}/>
                                </Link>
                                <div>
                                    <Link to={{pathname: `/user/${review.author._id}`}}>
                                        <p><b>{review.author.name}</b></p>
                                    </Link>
                                    <p>Joined {moment(review.author.createdAt).format('MMM YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </section>
    )
}

export default UserReviews