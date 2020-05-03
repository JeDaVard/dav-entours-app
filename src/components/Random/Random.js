import React from "react";
import classes from './Random.module.css';
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpeg'

function Random() {
    return (
        <section className={classes.Random}>
            <div className="row">
                <div className={classes.Random__top}>
                    <div className={classes.Random__title}>
                        <h2>Introducing Best Tours</h2>
                        <p>Now you can meet people all over the world while trying something new. Join live, interactive video sessions led by expert hosts—all without leaving home.</p>
                    </div>
                    <div className={classes.Random__button}>
                        <button>Show more</button>
                    </div>
                </div>
                <div className={classes.Random__grid}>
                    <div className={`${classes.Random__post} ${classes.post1}`}>
                        <div className={classes.Random__info}>
                            <h2>Mix secret sangria with Pedro from Lisbon Stretch</h2>
                            <p>Vardenis, Armenia</p>
                        </div>
                        <img src={image3} alt="image"/>
                    </div>
                    <div className={`${classes.Random__post} ${classes.post2}`}>
                        <div className={classes.Random__info}>
                            <h2>Mix secret sangria with Pedro from Lisbon Stretch</h2>
                            <p>Los Angeles, USA</p>
                        </div>
                        <img src={image2} alt="image"/>
                    </div>
                    <div className={`${classes.Random__post} ${classes.post3}`}>
                        <div className={classes.Random__info}>
                            <h2>Mix secret sangria with Pedro from Lisbon Stretch</h2>
                            <p>Sicilia, Italy</p>
                        </div>
                        <img src={image1} alt="image"/>
                    </div>
                    <div className={`${classes.Random__post} ${classes.post4}`}>
                        <div className={classes.Random__info}>
                            <h2>Mix secret sangria with Pedro from Lisbon Stretch</h2>
                            <p>Toronto, Canada</p>
                        </div>
                        <img src={image4} alt="image"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Random