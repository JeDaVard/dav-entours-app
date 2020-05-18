import React from 'react';
import classes from './Random.module.css';
import RandomItem from './RandomItem';
import RandomItemLoading from './RandomItemLoading';
import {Link} from "react-router-dom";

function Random(props) {
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

                            <div className={classes.Discover__gridParent}>
                                {!props.randoms.loading && props.randoms.data.length ? (
                                    <div className={classes.Discover__grid}>
                                        {props.randoms.data.slice(0,4).map( random => <RandomItem tour={random} key={random._id}/>)}
                                    </div>
                                ) : (
                                    <RandomItemLoading />
                                )}
                            </div>

                    <div className={classes.Discover__mobileLink}>
                        <Link to={'/'}>Discover</Link>
                    </div>
            </div>
        </div>
    );
}

export default Random;
