import React from "react";
import classes from './Recommended.module.css'
import ThumbedImage from "../../components/UI/ImageLoading/ThumbedImage";
import Justicon from "../../components/UI/JustIcon/Justicon";

export default function Recommended(props) {
    const { tours } = props;

    return (
        <div className={classes.content}>
            {tours.map(tour => (
                <div className={classes.tour}>
                    <div className={classes.imageFrame}>
                        <ThumbedImage src={tour.imageCover} className={classes.image} alt={tour.name}/>
                    </div>
                    <div className={classes.bottom}>
                        <div className={classes.rating}>
                            <Justicon icon={'star'}/>
                            <h2>{tour.ratingsAverage}</h2>
                            <p>&nbsp;|&nbsp;</p>
                            <h3>(<b>{tour.ratingsQuantity}</b>)</h3>
                        </div>
                        <div className={classes.title}>
                            <h1>{tour.name}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}