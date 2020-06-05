import React from 'react';
import classes from './TourImages.module.css';

function TourImages(props) {
    const { images } = props;
    return (
        // <section className={classes.TourImages}>
                <div className={classes.TourImages__grid}>
                    {images.map(image => (
                        <div className={classes.TourImages__frame} key={image}>
                            <img src={`${process.env.REACT_APP_SERVER}/images/tour/${image}`} alt="tour" />
                        </div>
                    ))}
                </div>
        // </section>
    );
}

export default TourImages
