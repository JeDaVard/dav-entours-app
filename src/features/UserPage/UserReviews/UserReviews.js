import React from "react";
import classes from './UserReviews.module.css';
import {Tab, Tabs} from "../../../components/UI/Tabs/Tabs";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import UserReviewItem from "./UserReviewItem";

const UserReviews = (props)  => {
    const { user, more, loading } = props;

    const onMore = label => {
        more({
            variables: {
                id: user._id,
                limit: 6,
                page: label === 'fromTravelers' ? user.reviews.nextPage : user.ownReviews.nextPage
            },
            updateQuery: (prev, { fetchMoreResult: { user }} ) => {
                return label === 'fromTravelers'
                    ? { ...prev, user: { ...prev.user, reviews: {
                                ...user.reviews,
                                data: [
                                    ...prev.user.reviews.data,
                                    ...user.reviews.data
                                ]
                            }},
                    }
                    : { ...prev, user: { ...prev.user, ownReviews: {
                                ...user.ownReviews,
                                data: [
                                    ...prev.user.ownReviews.data,
                                    ...user.ownReviews.data
                                ]
                            }},
                    }
            }
        })
    }

    const travelerLabel = 'fromTravelers', guideLabel = 'fromGuides';

    return (
        <section className={classes.stuff}>
            <div className={classes.reviews}>
                <h1>{user.reviews.total + user.ownReviews.total} reviews</h1>

                <Tabs>
                    <Tab label={travelerLabel} tabName={'From Travelers'}>
                        {user.reviews.data.map( review => (
                            <UserReviewItem key={review._id} review={review}/>
                        ))}
                        <div className={classes.more}>
                            {user.reviews.hasMore
                                ? (
                                    loading
                                        ? <SimpleButton onClick={() => {}}>&nbsp;&nbsp;&nbsp;Loading...&nbsp;&nbsp;</SimpleButton>
                                        : <SimpleButton onClick={() => onMore(travelerLabel)}>More Reviews</SimpleButton>
                                )
                                : <p>All <b>{user.reviews.total}</b> reviews</p>}
                        </div>
                    </Tab>
                    <Tab label={guideLabel} tabName={'From Guides'}>
                        {user.ownReviews.data.map( review => (
                            <UserReviewItem key={review._id} review={review}/>
                        ))}
                        <div className={classes.more}>
                            {user.ownReviews.hasMore
                                ? (
                                    loading
                                        ? <SimpleButton onClick={() => {}}>&nbsp;&nbsp;&nbsp;Loading...&nbsp;&nbsp;</SimpleButton>
                                        : <SimpleButton onClick={() => onMore(guideLabel)}>More Reviews</SimpleButton>
                                )
                                : <p>All <b>{user.ownReviews.total}</b> reviews</p>}
                        </div>
                    </Tab>
                </Tabs>

            </div>
        </section>
    )
}

export default UserReviews