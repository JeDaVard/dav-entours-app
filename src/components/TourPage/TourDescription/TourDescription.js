import React from "react";
import {connect} from "react-redux";
import classes from './TourDescription.module.css';


function TourDescription(props) {
    const { loading, tour } = props;
    return (
        <>
           <section className={classes.TourDescription}>
                <div className="row">
                    <div className={classes.TourDescription__content}>
                        <div className={classes.TourDescription__left}>
                            <h2>YOUR TOUR GUIDES</h2>
                            <div className={classes.TourDescription__users}>
                                <div className={classes.TourDescription__user}>
                                    <img src={`http://localhost:5000/images/user/${!loading && tour.author.photo}`} alt="user"/>
                                    <h3>{!loading && tour.author.name}</h3>
                                </div>
                                {!loading &&  tour.guides.map( guide => (
                                    <div className={classes.TourDescription__user} key={guide._id}>
                                        <img src={`http://localhost:5000/images/user/${guide.photo}`} alt="user"/>
                                        <h3>{guide.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.TourDescription__right}>
                            <h2>ABOUT {tour.name && tour.name.toUpperCase()} TOUR</h2>
                            <p>
                                {tour.summary}
                            </p>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

const mapStateToProps = state => ({
    tour: state.feed.tour.data,
    loading: state.feed.tour.loading
})

export default connect(mapStateToProps)(TourDescription);