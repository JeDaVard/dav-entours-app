import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classes from './UpcomingEvents.module.css';
import Justicon from '../../components/UI/Justicon';
import ProgressiveImageLoading from "../../utils/ImageLoading/ProgressiveImageLoading";

function UpcomingEvents(props) {
    const { tours } = props;

    return (
        <div className={classes.UpcomingEvents__content}>
            {tours.map((tour) => (
                <div className={classes.UpcomingEvents__item} key={tour.slug}>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.UpcomingEvents__imageFrame}>
                            <img
                                className={classes.UpcomingEvents__image}
                                src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`}
                                alt=""
                            />
                        </div>
                    </Link>
                    <div className={classes.UpcomingEvents__info}>
                        <h4 className={classes.UpcomingEvents__infoPart}>
                            Participants {tour.participants.length}/
                            {tour.maxGroupSize}
                        </h4>
                        <Link to={'/'}>
                            <h2 className={classes.UpcomingEvents__title}>
                                {tour.name}
                            </h2>
                        </Link>
                        <div className={classes.UpcomingEvents__infoBottom}>
                            <p>{tour.startLocation.description}</p>
                            <p>
                                {moment(tour.startDates[0]).format(
                                    'ddd, DD MMM YYYY'
                                )}
                            </p>
                        </div>
                    </div>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.UpcomingEvents__remove}>
                            <Justicon
                                icon={'trash'}
                                className={classes.UpcomingEvents__removeIcon}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UpcomingEvents;
