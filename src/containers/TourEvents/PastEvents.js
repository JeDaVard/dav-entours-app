import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classes from './PastEvents.module.css';
import Justicon from '../../components/UI/Justicon';
import ThumbedImage from "../../utils/ImageLoading/ThumbedImage";

function PastEvents(props) {
    const { tours } = props;

    return (
        <div className={classes.content}>
            {tours.map((tour) => (
                <div className={classes.item} key={tour.slug}>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.imageFrame}>
                            <ThumbedImage
                                src={tour.imageCover}
                                className={classes.image}
                                alt={tour.name}
                                blur />
                        </div>
                    </Link>
                    <div className={classes.info}>
                        <h4 className={classes.infoPart}>
                            Participants {tour.participants.length}/
                            {tour.maxGroupSize}
                        </h4>
                        <Link to={'/'}>
                            <h2 className={classes.title}>
                                {tour.name}
                            </h2>
                        </Link>
                        <div className={classes.infoBottom}>
                            <p>{tour.startLocation.description}</p>
                            <p>
                                {moment(+tour.startDates[0]).format(
                                    'ddd, DD MMM YYYY'
                                )}
                            </p>
                        </div>
                    </div>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.remove}>
                            <Justicon
                                icon={'trash'}
                                className={classes.removeIcon}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PastEvents;
