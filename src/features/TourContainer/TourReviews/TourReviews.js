import React from "react";
import moment from "moment";
import classes from './TourReviews.module.css';
import Separator from "../../../components/UI/Separator/Separator";
import {Link} from "react-router-dom";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import { FETCH_MORE_REVIEWS } from "../queries";
import ButtonLoading from "../../../components/UI/ButtonLoading/ButtonLoading";

const TourReviews = (props) => {
    const { reviews } = props.tour;


    const moreReviewsHandler = () => {
        props.more({
            query: FETCH_MORE_REVIEWS,
            variables: { id: props.tour.slug, page: reviews.nextPage, limit: 4 },
            notifyOnNetworkStatusChange: true,
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult.tour.reviews.data) return;

                const merged = [
                    ...previousResult.tour.reviews.data,
                    ...fetchMoreResult.tour.reviews.data
                ]
                return {
                    ...previousResult,
                    tour: {
                        ...previousResult.tour,
                        reviews: {
                            // ATTENTION that's the new reviews
                            ...fetchMoreResult.tour.reviews,
                            data: merged
                        }
                    }
                }
            }
        })
    }

    const loadMoreButton = <SimpleButton
        disabled={props.loading}
        onClick={moreReviewsHandler}>
        {props.loading
            ? (<>
                <div className={classes.loading}>
                    <ButtonLoading />
                </div>
                <span style={{opacity: '0'}}>More Reviews</span>
            </>)
            : (
            'More Reviews'
        )}
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
                        <Separator color={'normal'} margin={'2 0'}/>
                    <div className={classes.content}>

                        {reviews.data.map( review => (
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