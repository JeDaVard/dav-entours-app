import React from "react";
import moment from "moment";
import classes from './TourReviews.module.css';
import Separator from "../../../components/UI/Separator/Separator";
import {Link} from "react-router-dom";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import {FETCH_TOUR_REVIEWS} from "../queries";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

const TourReviews = (props) => {
    const { reviews } = props;
    
    const moreReviewsHandler = () => {
        props.more({
            query: FETCH_TOUR_REVIEWS,
            variables: { id: props.tour.slug, page: reviews.nextPage, limit: 4 },
            notifyOnNetworkStatusChange: true,
        })
    }

    const loadMoreButton = <SimpleButton
            disabled={props.loading}
            loading={props.loading}
            onClick={moreReviewsHandler}>
            More Reviews
        </SimpleButton>

    return (
        <>
            <div className={classes.Reviews}>
                <div className="row">
                            <h2>Reviews</h2>
                            <div className={classes.info}>
                                <div className={classes.rating}>
                                    <Justicon icon={'star'}/><h3> {props.tour.ratingsAverage.toString().length === 1 ? props.tour.ratingsAverage+'.0' : props.tour.ratingsAverage}</h3>
                                </div>
                                <Separator vertical margin={'.5 .5'} color={'normal'} height={'2'}/>
                                <div className={classes.quantity}>
                                    <h3><b>{props.tour.ratingsQuantity}</b> reviews</h3>
                                </div>
                            </div>
                    <div className={classes.content}>

                        {!!reviews.data.length && reviews.data.map( review => (
                            <div className={classes.review} key={review._id}>
                                <div className={classes.reviewInfo}>
                                    <Link to={{pathname: `/user/${review.author._id}`}}>
                                        <UserAvatar alt={review.author.name}
                                                    src={review.author.photo}/>
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
                        <div className={classes.more}>
                        {reviews.hasMore
                            ? loadMoreButton
                            : <p>All <b>{reviews.total}</b> reviews</p>}
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}


export default TourReviews