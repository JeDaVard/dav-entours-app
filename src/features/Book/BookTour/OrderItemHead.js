import React from "react";
import classes from "./OrderItemHead.module.css";
import SmoothImage from "../../../components/UI/ImageLoading/SmoothImage";
import LocLink from "../../../components/UI/LocLink/LocLink";
import Justicon from "../../../components/UI/JustIcon/Justicon";

export default function OrderItemHead(props) {
    const { tour } = props;

    return (
        <div className={classes.details}>
            <div className={classes.imageFrame}>
                <SmoothImage src={tour.imageCover}
                             className={classes.image}
                             alt={tour.name}/>
                <div className={classes.gradient}/>
            </div>
            <div className={classes.info}>
                <div className={classes.nameFrame}>
                    <h2 className={classes.name}>{tour.name.slice(0,16)+'...'}</h2>
                    <LocLink
                        className={classes.loc}
                        address={tour.startLocation.address.length > 30
                            ? tour.startLocation.address.slice(0,30)+'...'
                            : tour.startLocation.address}
                        coordinates={['asd']}/>
                </div>
                <div className={classes.rating}>
                    <Justicon icon={'star'} />
                    <p><b>&nbsp;{tour.ratingsAverage}</b>&nbsp;({tour.ratingsQuantity})</p>
                </div>
            </div>
        </div>
    )
}