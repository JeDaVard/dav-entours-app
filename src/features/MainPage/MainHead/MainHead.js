import React from "react";
import classes from './MainHead.module.css';
import classNames from 'classnames/bind'
import {Link} from "react-router-dom";

const cx = classNames.bind(classes)

export default function MainHead(props) {
    const { location } = props;
    return (
        <div className={cx(classes.MainHead, {SearchHead: location})}>
            <div className={location ? classes.darker : classes.hide}/>
            <div className="row">
                {location ? (
                    <div className={classes.searchTitle}>
                        <h1>Tours around {location}</h1>
                        <h4>Wonder World in {location} and around, by our tour makers</h4>
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
                            <Link to="/tours/search?place=United%20States&precise=Seattle&coordinates=-122.3301,47.6038&dates=0,0&participants=1,25">Explore</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}