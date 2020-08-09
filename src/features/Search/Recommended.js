import React from "react";
import classes from './Recommended.module.css'
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import moment from "moment";
import Justicon from "../../components/UI/JustIcon/Justicon";
import { Link } from "react-router-dom";

export default function Recommended(props) {
    const { tours } = props;

    return (
        <div className={classes.content} dir="ltr">
            {tours.map(tour => (
                <div className={classes.tour} key={tour._id}>
                    <Link to={`/tour/${tour.slug}`}>
                        <div className={classes.imageFrame}>
                            <ThumbedImage src={tour.imageCover} className={classes.image} alt={tour.name}/>
                            <div className={classes.save}>
                                <Justicon icon={'heart'} className={classes.iconSave}/>
                            </div>
                            <div className={classes.start}>
                                {tour.starts.length ? (
                                    <>
                                        <Justicon icon="calendar" className={classes.icon}/>
                                        <h4>{moment(tour.starts[0].date).format('ddd, DD MMM')}</h4>
                                    </>
                                ) : (
                                    <h4>Save to follow its starts</h4>
                                )}
                            </div>
                        </div>
                    </Link>
                    <div className={classes.bottom}>
                        <div className={classes.ratingBox}>
                            <div className={classes.rating}>
                                <Justicon icon={'star'} className={`${classes.icon} ${classes.iconRating}`}/>
                                <h2>{tour.ratingsAverage}</h2>
                                <p>&nbsp;|&nbsp;</p>
                                <h3>({tour.ratingsQuantity})</h3>
                            </div>
                            <div className={classes.price}>
                                <h2>${tour.price}</h2>
                                <h3>&nbsp;/ person</h3>
                            </div>
                        </div>
                        <div className={classes.title}>
                            <Link to={`/tour/${tour.slug}`}>
                                <h1>
                                    {tour.name.length > 40
                                        ? tour.name.slice(' ').slice(0,4).join(' ') + ' ...'
                                        : tour.name}
                                </h1>
                            </Link>
                            <h2>
                                <Justicon icon={'map-pin'} className={classes.icon}/>
                                <span>
                                {tour.startLocation.description.length > 40
                                    ? tour.startLocation.description.slice(' ').slice(0,4).join(' ')
                                    : tour.startLocation.description}
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}