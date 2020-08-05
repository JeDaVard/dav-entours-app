import React from "react";
import classes from './MainHead.module.css';
import classNames from 'classnames/bind'

const cx = classNames.bind(classes)

export default function MainHead(props) {
    const { location } = props;
    return (
        <div className={cx(classes.MainHead, {SearchHead: location})}>
            <div className="row">
                {location ? (
                    <div className={classes.searchTitle}>
                        <h1>Tours around LOCATION</h1>
                        <h4>World of wonder around LOCATION by our tour makers</h4>
                    </div>
                ) : (
                    <div className={classes.headCall}>
                        <div className={classes.title}>
                            <h1>Get out and stretch your imagination</h1>
                        </div>
                        <div className={classes.description}>
                            <h4>Take a tour, go find a world of wonder, discover our home planet.</h4>
                        </div>
                        <div className={classes.button}>
                            <button>Explore</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}