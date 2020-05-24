import React from 'react';
import classes from './TourImages.module.css';
import { connect } from 'react-redux';

function TourImages(props) {
    const { loading, tour: { images } } = props;
    return (
        // <section className={classes.TourImages}>
                <div className={classes.TourImages__grid}>
                    {!loading && images.map(image => (
                        <div className={classes.TourImages__frame} key={image}>
                            <img src={`${process.env.REACT_APP_SERVER}/images/tour/${image}`} alt="tour" />
                        </div>
                    ))}
                </div>
        // </section>
    );
}

const mapStateToProps = (state) => ({
    tour: state.feed.tour.data,
    loading: state.feed.tour.loading,
});

export default connect(mapStateToProps)(TourImages);
