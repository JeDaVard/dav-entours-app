import React from "react";
import classes from './TourDescription.module.css';
import {Link} from "react-router-dom";


function TourDescription(props) {
    const { tour } = props
    return (
        <>
           <section className={classes.TourDescription}>
                <div className="row">
                    <div className={classes.TourDescription__content}>
                        <div className={classes.TourDescription__left}>
                            <h2>YOUR TOUR GUIDES</h2>
                            <div className={classes.TourDescription__users}>
                                <Link to={{pathname: `/user/${tour.author._id}`}}>
                                    <div className={classes.TourDescription__user}>
                                        <img src={`${process.env.REACT_APP_SERVER}/images/user/${tour.author.photo}`} alt="user"/>
                                        <h3>{tour.author.name}</h3>
                                        <p>Author</p>
                                    </div>
                                </Link>
                                {tour.guides.map( guide => (
                                    <Link to={{pathname: `/user/${guide._id}`}} key={guide._id}>
                                        <div className={classes.TourDescription__user}>
                                            <img src={`${process.env.REACT_APP_SERVER}/images/user/${guide.photo}`} alt="user"/>
                                            <h3>{guide.name}</h3>
                                            <p>Guide</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={classes.TourDescription__right}>
                            <h2>ABOUT {tour.name.toUpperCase()} TOUR</h2>
                            <p>
                                {tour.description}
                            </p>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default TourDescription