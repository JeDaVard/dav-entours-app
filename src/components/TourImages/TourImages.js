import React from "react";
import classes from './TourImages.module.css';
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpeg'

function TourImages() {
    return (
        <section className={classes.TourImages}>
            <div className="row">
                <div className={classes.TourImages__grid}>
                    <div className={classes.TourImages__gridRow}>
                        <img src={image1} alt=""/>
                        <img src={image2} alt=""/>
                    </div>
                    <div className={classes.TourImages__gridRow}>
                        <img src={image3} alt=""/>
                        <img src={image4} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourImages