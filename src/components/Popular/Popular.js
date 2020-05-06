import React from "react";
import classes from './Popular.module.css';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './user.jpg';


function Popular() {
    return (
        <section className={classes.Popular}>
            <div className="row">
                <div className={classes.Popular__content}>
                    <div className={classes.Popular__tour}>
                        <div className={classes.Popular__image}>
                            <img src={image1} alt="title"/>
                            <div className={classes.new}><p>NEW</p></div>
                            <div className={classes.Popular__price}><p>$299</p></div>
                            <div className={classes.Popular__title}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            </div>
                        </div>
                        <div className={classes.Popular__bottom}>
                            <a href="/" className={classes.Popular__user}>
                                <img src={image4} alt="user"/>
                                <p>Andrew Jonsons</p>
                            </a>
                            <div className={classes.Popular__date}>
                                June 2020
                            </div>
                            <div className={classes.Popular__loc}>
                                Miami, USA
                            </div>
                        </div>
                    </div>
                    <div className={classes.Popular__tour}>
                        <div className={classes.Popular__image}>
                            <img src={image2} alt="title"/>
                            <div className={classes.new}><p>NEW</p></div>
                            <div className={classes.Popular__price}><p>$329</p></div>
                            <div className={classes.Popular__title}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            </div>
                        </div>
                        <div className={classes.Popular__bottom}>
                            <a href="/" className={classes.Popular__user}>
                                <img src={image4} alt="user"/>
                                <p>Andrew Jonsons</p>
                            </a>
                            <div className={classes.Popular__date}>
                                June 2020
                            </div>
                            <div className={classes.Popular__loc}>
                                Miami, USA
                            </div>
                        </div>
                    </div>
                    <div className={classes.Popular__tour}>
                        <div className={classes.Popular__image}>
                            <img src={image3} alt="title"/>
                            <div className={classes.new}><p>NEW</p></div>
                            <div className={classes.Popular__price}><p>$149</p></div>
                            <div className={classes.Popular__title}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            </div>
                        </div>
                        <div className={classes.Popular__bottom}>
                            <a href="/" className={classes.Popular__user}>
                                <img src={image4} alt="user"/>
                                <p>Andrew Jonsons</p>
                            </a>
                            <div className={classes.Popular__date}>
                                June 2020
                            </div>
                            <div className={classes.Popular__loc}>
                                Miami, USA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Popular