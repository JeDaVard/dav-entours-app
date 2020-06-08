import React from 'react';
import classes from './TourHead.module.css';
import '../animation.css';
import ThumbedImage from '../../../utils/ImageLoading/ThumbedImage';
import moment from "moment";
import Justicon from "../../UI/Justicon";

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
                <div className={classes.TourHead__shareBox}>
                    <div className={classes.TourHead__share}>
                        <Justicon icon={'upload'} className={classes.TourHead__shareIcon}/>
                        <b>Share</b>
                    </div>
                    <div className={classes.TourHead__share}>
                        <Justicon icon={'heart'} className={classes.TourHead__shareIcon}/>
                        <b>Save</b>
                    </div>
                </div>
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
                            <Justicon icon={'map-pin'} className={classes.TourHead__location} />{tour.startLocation.description}
                        </h4>
                    </div>
                </div>
                <div className={classes.TourHead__bottom}>
                    <h3>{tour.summary}</h3>
                    <div className={classes.TourHead__info}>
                        <p>
                            <Justicon icon={'calendar'} className={classes.TourHead__icon}/>
                            <b>{moment(+tour.startDates[0]).format('ddd DD MMM YYYY')}</b>
                        </p>
                        <p>
                            <Justicon icon={'zap'} className={classes.TourHead__icon}/>
                            <b>Level {tour.difficulty}</b>
                        </p>
                        <p>
                            <Justicon icon={'users'} className={classes.TourHead__icon}/>
                            <b>{tour.participants.length
                                ? tour.participants.length + ' / ' + tour.maxGroupSize + ' people'
                                : 'Be the first'}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourHead
