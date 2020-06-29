import React from "react";
import moment from "moment";
import classes from './TourReviews.module.css';
import Separator from "../../UI/Separator/Separator";
import {Link} from "react-router-dom";
import Justicon from "../../UI/Justicon";

const TourReviews = ({ tour }) => {
    const { reviews } = tour;
    return (
        <>
            <div className={classes.Reviews}>
                <div className="row">
                            <h2>Reviews</h2>
                            <div className={classes.info}>
                                <div className={classes.rating}>
                                    <Justicon icon={'star'}/><h3> {tour.ratingsAverage.toString().length === 1 ? tour.ratingsAverage+'.0' : tour.ratingsAverage}</h3>
                                </div>
                                <Separator vertical margin={'.5 .5'} color={'normal'} height={'2'}/>
                                <div className={classes.quantity}>
                                    <h3><b>{tour.ratingsQuantity}</b> reviews</h3>
                                </div>
                            </div>
                        <Separator color={'normal'} margin={'2 0'}/>
                    <div className={classes.content}>

                        {reviews.map( review => (
                            <div className={classes.review} key={review._id}>
                                <div className={classes.reviewInfo}>
                                    <Link to={{pathname: `/user/${review.author._id}`}}>
                                        <img src={`${process.env.REACT_APP_SERVER}/images/user/${review.author.photo}`} alt={review.author.name}/>
                                    </Link>
                                    <div className={classes.reviewer}>
                                        <Link to={{pathname: `/user/${review.author._id}`}}>
                                            <h3>{review.author.name}</h3>
                                        </Link>
                                        <h4>{moment(review.createdAt).format('D MMMM YYYY')}</h4>
                                    </div>
                                </div>
                                <p>{review.review}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            </>
    )
}


export default TourReviews