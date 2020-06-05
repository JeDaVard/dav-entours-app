import React from 'react';
import classes from './TourHead.module.css';
import '../animation.css';
import ThumbedImage from '../../../utils/ImageLoading/ThumbedImage';
import moment from "moment";

function TourHead(props) {
    const { tour } = props;

    return (
        <div className={classes.TourHead__cover}>
            <ThumbedImage
                className={classes.TourHead__coverImage}
                src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`}
                thumb={`${
                    process.env.REACT_APP_SERVER
                }/images/tour/${tour.imageCover.slice(
                    0,
                    tour.imageCover.length - 4
                )}.thumb.jpeg`}
                blur={true}
                alt={tour.name}
            />
            <div className={'row'}>
                <div className={classes.TourHead}>
                    <div className={classes.TourHead__left}>
                        <div className={classes.TourHead__hash}>
                            {tour.hashtags ? (
                                tour.hashtags.map((hash) => (
                                    <p key={hash}>#{hash}</p>
                                ))
                            ) : (
                                <p>0 hashtags</p>
                            )}
                        </div>
                        <h2>{tour.name}</h2>
                        <h4>
                            {tour.startLocation.description}
                        </h4>
                    </div>
                </div>
                <div className={classes.TourHead__info}>
                    <p>
                        NEXT DATE:{' '}
                        <b>
                            {moment(+tour.startDates[0]).format('dd DD MMM YYYY')}
                        </b>
                    </p>
                    <p>
                        DIFFICULTY: <b>{tour.difficulty}</b>
                    </p>
                    <p>
                        PARTICIPANTS:{' '}
                        <b>
                            {tour.participants.length
                                ? tour.participants.length + ' Participants'
                                : 'Be the first'}
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TourHead
