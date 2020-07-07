import React from "react";
import classes from "./MyToursItem.module.css";
import Justicon from "../../components/UI/JustIcon/Justicon";
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import moment from "moment";
import {Link} from "react-router-dom";

function MyToursItem(props) {
    const { data } = props;

    return (
        <div className={classes.tourBox}>
            <div className={classes.imageFrame}>
                {data.imageCover &&
                <Link to={data.draft ? `/tour/${data.slug}/edit/heading` : `/tour/${data.slug}`}>
                    <ThumbedImage
                            src={data.imageCover}
                            className={classes.image}
                            alt={data.name}
                            blur
                        />
                    </Link> }
                <div className={classes.main}>
                    <div className={classes.top}>
                        <div className={classes.stats}>
                            <div>
                                {data.starts.length &&
                                (<h2>{data.starts[0].participants.length} / {data.maxGroupSize} participants</h2>)}
                            </div>
                        </div>
                        <div className={classes.instruments}>
                            <div className={classes.remove}>
                                <Justicon
                                    icon={'inbox'}
                                    className={classes.removeIcon}
                                />
                            </div>
                            <Link to={`/tour/${data.slug}/edit/heading`}>
                                <div className={classes.remove}>
                                    <Justicon
                                        icon={'edit'}
                                        className={classes.removeIcon}
                                    />
                                </div>
                            </Link>
                            <div className={classes.remove}>
                                <Justicon
                                    icon={'trash'}
                                    className={classes.removeIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.bottom}>
                        <div className="row">
                            <div className={classes.tourTitle}>
                                <h1>{data.name.length > 40 ? data.name.slice(40) : data.name}</h1>
                            </div>
                            <div className={classes.bottomInfo}>
                                {data.starts.length &&
                                    <div className={classes.startLoc}>
                                        <p className={classes.nextStart}>
                                            {moment(+data.starts[0].date).format('ddd DD MMMM YYYY')}
                                        </p>
                                        <p>{data.startLocation.description}</p>
                                    </div>
                                }
                                {data.ratingsQuantity > 1 &&
                                        <div className={classes.ratingBox}>
                                            <div className={classes.rating}>
                                                <Justicon icon={'star'}/> <h2>&nbsp; {data.ratingsAverage}</h2>
                                            </div>
                                            <div className={classes.ratingQuantity}>
                                                <p>{data.ratingsQuantity} reviews</p>
                                            </div>
                                        </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyToursItem