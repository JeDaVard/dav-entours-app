import React, {useCallback, useEffect, useState} from "react";
import classes from './PopDown.module.css';
import AnimatedButton from "../../UI/AnimatedButton/AnimatedButton";
import Justicon from "../../UI/Justicon";
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

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
                <div className={classes.content}>
                    <div className={classes.user}>
                        <div>
                            <ThumbedImage
                                src={props.tour.imageCover}
                                className={classes.image}
                                alt={'A tour you will like'}
                                blur />
                        </div>
                        <h3>{props.tour.name}</h3>
                        <div className={classes.rating}>
                            <p><b>{props.tour.ratingsAverage}</b></p>
                            &nbsp;
                            <Justicon icon={'star'}/>
                            &nbsp;
                            <p>({props.tour.ratingsQuantity})</p>
                        </div>
                    </div>
                    <div className={classes.userMobile}>
                        <div className={classes.userMobile__price}>
                            <h2>${props.tour.price} per person</h2>
                        </div>
                        <div className={classes.userMobile__title}>
                            <h3>{props.tour.name} - </h3>
                            &nbsp;
                            <p><b>{props.tour.ratingsAverage}</b></p>
                            &nbsp;
                            <Justicon icon={'star'} />
                            &nbsp;
                            <p>({props.tour.ratingsQuantity})</p>
                        </div>
                    </div>
                    <div className={classes.purchase}>
                        <h2>${props.tour.price} per person</h2>
                        <AnimatedButton button fn={() => props.onReserve()}>Reserve</AnimatedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopDown