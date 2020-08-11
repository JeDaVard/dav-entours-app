import React from "react";
import classes from './TourDescription.module.css';
import {Link} from "react-router-dom";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";


function TourDescription(props) {
    const { tour } = props
    return (
        <>
           <section className={classes.TourDescription}>
                <div className="row">
                    <div className={classes.content}>
                        <div className={classes.left}>
                            <h2>YOUR TOUR GUIDES</h2>
                            <div className={classes.users}>
                                <Link to={{pathname: `/user/${tour.author._id}`}}>
                                    <div className={classes.user}>
                                        <UserAvatar alt={tour.author.name}
                                                    src={tour.author.photo}/>
                                        <h3>{tour.author.name}</h3>
                                        <p>Author</p>
                                    </div>
                                </Link>
                                {tour.guides.map( guide => (
                                    <Link to={{pathname: `/user/${guide._id}`}} key={guide._id}>
                                        <div className={classes.user}>
                                            <UserAvatar alt={guide.name}
                                                        src={guide.photo}/>
                                            <h3>{guide.name}</h3>
                                            <p>Guide</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={classes.right}>
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