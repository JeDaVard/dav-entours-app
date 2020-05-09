import React from 'react';
import classes from './Random.module.css';
import RandomItem from './RandomItem';
import RandomItemLoading from './RandomItemLoading';

function Random(props) {
    return (
        <section className={classes.Random}>
            <div className="row">
                <div className={classes.Random__top}>
                    <div className={classes.Random__title}>
                        <h2>Introducing Best Tours</h2>
                        <p>
                            Now you can meet people all over the world while
                            trying something new. Join live, interactive video
                            sessions led by expert hosts—all without leaving
                            home.
                        </p>
                    </div>
                    <div className={classes.Random__button}>
                        <button>Show more</button>
                    </div>
                </div>

                {!props.randoms.loading && props.randoms.data.length ? (
                    <div className={classes.Random__grid}>
                        {props.randoms.data.map( random => <RandomItem tour={random} key={random._id}/>)}
                    </div>
                ) : (
                    <RandomItemLoading />
                )}
            </div>
        </section>
    );
}

export default Random;
