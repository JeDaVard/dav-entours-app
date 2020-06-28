import React from 'react';
import classes from './TourImages.module.css';
import ThumbedImage from "../../../utils/ImageLoading/ThumbedImage";

function TourImages(props) {
    const { images } = props;
    return (
        // <section className={classes.TourImages}>
                <div className={classes.TourImages__grid}>
                    {images.map(image => (
                        <div className={classes.TourImages__frame} key={image}>
                            <ThumbedImage
                                src={image}
                                className={classes.TourImages__image}
                                alt={'tour demo'}
                                blur
                            />
                        </div>
                    ))}
                </div>
        // </section>
    );
}

export default TourImages
