import React from 'react'
import classes from './UserReviewItem.module.css'
import { Link } from "react-router-dom";
import moment from "moment";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

export default function UserReviewItem({ review }) {
    return (
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
                    <img src={`${process.env.REACT_APP_CDN}/${review.tour.imageCover}`}
                         className={classes.UserReviews__tourImage}
                         alt={review.tour.name}/>
                </Link>
            </div>
            <p>{review.review}</p>
            <div className={classes.reviewer}>
                <Link to={{pathname: `/user/${review.author._id}`}}>
                    <UserAvatar alt={review.author.name}
                                src={review.author.photo}/>
                </Link>
                <div>
                    <Link to={{pathname: `/user/${review.author._id}`}}>
                        <p><b>{review.author.name}</b></p>
                    </Link>
                    <p>Joined {moment(review.author.createdAt).format('MMM YYYY')}</p>
                </div>
            </div>
        </div>
    )
}