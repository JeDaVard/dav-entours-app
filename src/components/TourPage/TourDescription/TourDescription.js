import React from "react";
import {connect} from "react-redux";
import classes from './TourDescription.module.css';
import {Link} from "react-router-dom";


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
                                <Link to={{pathname: `/user/${!loading && tour.author._id}`}}>
                                    <div className={classes.TourDescription__user}>
                                        <img src={`http://localhost:5000/images/user/${!loading && tour.author.photo}`} alt="user"/>
                                        <h3>{!loading && tour.author.name}</h3>
                                        <p>Author</p>
                                    </div>
                                </Link>
                                {!loading &&  tour.guides.map( guide => (
                                    <Link to={{pathname: `/user/${guide._id}`}} key={guide._id}>
                                        <div className={classes.TourDescription__user}>
                                            <img src={`http://localhost:5000/images/user/${guide.photo}`} alt="user"/>
                                            <h3>{guide.name}</h3>
                                            <p>Guide</p>
                                        </div>
                                    </Link>
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