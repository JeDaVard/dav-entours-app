import classes from "./DatePrice.module.css";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import moment from "moment";
import React from "react";

export default function DatePrice(props) {
    const { price, date } = props;
    
    return (
        <>
            <div className={classes.time}>
                <div className={classes.timeIcon}>
                    <Justicon icon={'calendar'} className={classes.icon}/><p>&nbsp;Date</p>
                </div>
                <p>{moment(+date).format('dd, DD MMM, hh:mm A')}</p>
            </div>
            <div className={classes.datePrice}>
                <div className={classes.datePriceIcon}>
                    <Justicon icon={'dollar-sign'} className={classes.icon}/><p>&nbsp;Price</p>
                </div>
                <p>${price} per person</p>
            </div>
            <div className={classes.datePrice}>
                <div className={classes.datePriceIcon}>
                    <Justicon icon={'users'} className={classes.icon}/><p>&nbsp;By members</p>
                </div>
                <p>${price}</p>
            </div>
            <div className={classes.datePrice}>
                <div className={classes.datePriceIcon}>
                    <Justicon icon={'database'} className={classes.icon}/><p>&nbsp;Fee</p>
                </div>
                <p style={{color: 'green'}}>+${price*8/100}</p>
            </div>
            <div className={classes.datePrice}>
                <div className={classes.datePriceIcon}>
                    <Justicon icon={'credit-card'} className={classes.icon}/><p>&nbsp;Total(USD)</p>
                </div>
                <p><b>${price + (price*8/100)}</b></p>
            </div>
        </>
    )
}