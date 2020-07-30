import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classes from './PastEvents.module.css';
import Justicon from '../../components/UI/JustIcon/Justicon';
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";

function PastEvents(props) {
    const { orders } = props;

    return (
        <div className={classes.content}>
            {orders.map(({tour, start}) => (
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
                            Participants {start.participants.length}/
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
                                {moment(start.date).format(
                                    'ddd, DD MMM YYYY'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PastEvents;
