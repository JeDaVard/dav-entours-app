import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classes from './PastEvents.module.css';
import Justicon from '../../components/UI/Justicon';
import ThumbedImage from "../../utils/ImageLoading/ThumbedImage";

function PastEvents(props) {
    const { tours } = props;

    return (
        <div className={classes.PastEvents__content}>
            {tours.map((tour) => (
                <div className={classes.PastEvents__item} key={tour.slug}>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.PastEvents__imageFrame}>
                            <ThumbedImage
                                src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`}
                                thumb={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover.slice(0, tour.imageCover.length-4)}.thumb.jpeg`} blur={true}
                                className={classes.PastEvents__image}
                                alt={tour.name}
                            />
                        </div>
                    </Link>
                    <div className={classes.PastEvents__info}>
                        <h4 className={classes.PastEvents__infoPart}>
                            Participants {tour.participants.length}/
                            {tour.maxGroupSize}
                        </h4>
                        <Link to={'/'}>
                            <h2 className={classes.PastEvents__title}>
                                {tour.name}
                            </h2>
                        </Link>
                        <div className={classes.PastEvents__infoBottom}>
                            <p>{tour.startLocation.description}</p>
                            <p>
                                {moment(+tour.startDates[0]).format(
                                    'ddd, DD MMM YYYY'
                                )}
                            </p>
                        </div>
                    </div>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.PastEvents__remove}>
                            <Justicon
                                icon={'trash'}
                                className={classes.PastEvents__removeIcon}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PastEvents;
