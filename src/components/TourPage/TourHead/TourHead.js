import React from "react";
import classes from './TourHead.module.css';
import cover from './cover.jpg';

function TourHead() {
    return (
        <div className={classes.TourHead__cover}>
            <img src={cover} alt=""/>
            <div className={'row'}>
                <div className={classes.TourHead}>
                    <div className={classes.TourHead__left}>
                        <div className={classes.TourHead__hash}>
                            <p>#mountain</p>
                            <p>#mountain</p>
                        </div>
                        <h2>THE FOREST HIKER TOUR HIKER TOUR</h2>
                        <h4>California, USA</h4>
                    </div>
                </div>
                <div className={classes.TourHead__info}>
                    <p>NEXT DATE: <b>April 2021</b></p>
                    <p>DIFFICULTY: <b>Easy</b></p>
                    <p>PARTICIPANTS: <b>25 People</b></p>
                </div>
            </div>
        </div>
    )
}

export default TourHead