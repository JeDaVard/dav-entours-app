import React from "react";
import { connect } from 'react-redux';
import classes from './PopDown.module.css';
import user from './user-4.jpg';
import AnimatedButton from "../../UI/AnimatedButton/AnimatedButton";

function PopDown(props) {
    const show = !props.show ? ` ${classes.hide}` : '';
    return (
        <div className={`${classes.PopDown}${show}`} >
            <div className="row">
                <div className={classes.PopDown__content}>
                    <div className={classes.PopDown__user}>
                        <img src={`${process.env.REACT_APP_SERVER}/images/tour/${props.tour.imageCover}`} alt="user"/>
                        <h3>{props.tour.name}</h3>
                        <div className={classes.PopDown__rating}>
                            <p><b>{props.tour.ratingsAverage}</b></p>
                            <p>&nbsp;({props.tour.ratingsQuantity})</p>
                        </div>
                    </div>
                    <div className={classes.PopDown__purchase}>
                        <h2>${props.tour.price} per person</h2>
                        <AnimatedButton button={true} fn={() => console.log('hello')}>Reserve a place</AnimatedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    tour: state.feed.tour.data
})
export default connect(mapStateToProps)(PopDown)