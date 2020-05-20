import React from 'react';
import {Link} from "react-router-dom";
import classes from './Discover.module.css';
import DiscoverItem from './DiscoverItem';
import DiscoverItemLoading from './DiscoverItemLoading';
import DiscoverItemLoadingMobile from './DiscoverItemLoadingMobile';

function Discover(props) {
    return (
        <div className={classes.Discover}>
                    <div className="row">
                        <section className={classes.Discover__top}>
                            <div className={classes.Discover__description}>
                                <h1 className={classes.Discover__titleBox}>
                                    <div className={classes.Discover__title}>
                                        Introducing Online Experiences
                                    </div>
                                </h1>
                                <div className={classes.Discover__text}>
                                    Now you can meet people all over the
                                    world while trying something new. Join
                                    live, interactive video sessions led by
                                    expert hosts—all without leaving home.
                                </div>
                            </div>
                            <div className={classes.Discover__link}>
                                <Link to={'/'}>Discover</Link>
                            </div>
                        </section>
                    </div>
                    <div className={classes.Discover__row}>
                        <div className={classes.Discover__gridParent}>
                            {!props.discovers.loading && props.discovers.data.length ? (
                                <div className={classes.Discover__grid}>
                                    {props.discovers.data.slice(0,4).map( discover => <DiscoverItem tour={discover} key={discover._id}/>)}
                                </div>
                            ) : (
                                <>
                                    {props.isMobile ? <DiscoverItemLoadingMobile /> : <DiscoverItemLoading />}
                                </>
                            )}
                        </div>

                        <div className={classes.Discover__mobileLink}>
                            <Link to={'/'}>Discover</Link>
                        </div>
                    </div>
        </div>
    );
}

export default Discover;
