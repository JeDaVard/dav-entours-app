import React, {useCallback, useEffect, useState} from "react";
import { connect } from 'react-redux';
import classes from './PopDown.module.css';
import AnimatedButton from "../../UI/AnimatedButton/AnimatedButton";
import Justicon from "../../UI/Justicon";

function PopDown(props) {
    const [showPopDown, setShowPopDown] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false,
    });

    const handleScroll = useCallback(() => {
        const { prevScrollPos } = showPopDown;

        const currentScrollPos = window.pageYOffset;
        const visible =
            prevScrollPos < currentScrollPos && currentScrollPos > 70;

        setShowPopDown((state) => ({
            ...state,
            prevScrollPos: currentScrollPos,
            visible,
        }));
    }, [showPopDown]);

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const show = !showPopDown.visible ? ` ${classes.hide}` : '';
    return (
        <div className={`${classes.PopDown}${show}`} >
            <div className="row">
                <div className={classes.PopDown__content}>
                    <div className={classes.PopDown__user}>
                        <img src={props.tour.imageCover && `${process.env.REACT_APP_SERVER}/images/tour/${props.tour.imageCover}`} alt="user"/>
                        <h3>{props.tour.name}</h3>
                        <div className={classes.PopDown__rating}>
                            <p><b>{props.tour.ratingsAverage}</b></p>
                            &nbsp;
                            <Justicon icon={'star'}/>
                            &nbsp;
                            <p>({props.tour.ratingsQuantity})</p>
                        </div>
                    </div>
                    <div className={classes.PopDown__userMobile}>
                        <div className={classes.PopDown__userMobile__price}>
                            <h2>${props.tour.price} per person</h2>
                        </div>
                        <div className={classes.PopDown__userMobile__title}>
                            <h3>{props.tour.name} - </h3>
                            &nbsp;
                            <p><b>{props.tour.ratingsAverage}</b></p>
                            &nbsp;
                            <Justicon icon={'star'} />
                            &nbsp;
                            <p>({props.tour.ratingsQuantity})</p>
                        </div>
                    </div>
                    <div className={classes.PopDown__purchase}>
                        <h2>${props.tour.price} per person</h2>
                        <AnimatedButton button={true} fn={() => console.log('hello')}>Reserve</AnimatedButton>
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