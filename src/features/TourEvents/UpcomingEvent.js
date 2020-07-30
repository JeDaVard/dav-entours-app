import React, {useState} from "react";
import classes from "./UpcomingEvents.module.css";
import {Link} from "react-router-dom";
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import moment from "moment";
import Justicon from "../../components/UI/JustIcon/Justicon";

export default function UpcomingEvent(props) {
    const { order } = props;
    const { start, tour } = props.order

    const [ more, setMore ] = useState(false)
    return (
        <div className={classes.item}>
            <Link to={`/tourevents/${tour.slug}`}>
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
                        {moment(+start.date).format(
                            'ddd, DD MMM YYYY'
                        )}
                    </p>
                </div>
            </div>
            <div className={classes.more} onClick={() => setMore(!more)}>
                <Justicon
                    icon={'more-horizontal'}
                    className={classes.moreIcon}
                />
            </div>
            {more && (
                <div className={classes.moreBlock}>
                    <ul>
                        <li><Link to={'/tour/'+tour.slug}>More</Link></li>
                        <li>Cancel</li>
                    </ul>
                </div>
            )}
        </div>
    )
}