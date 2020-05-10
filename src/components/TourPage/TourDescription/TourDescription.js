import React from "react";
import classes from './TourDescription.module.css';
import user1 from './user-4.jpg';
import user2 from './user-6.jpg';
import user3 from './user-17.jpg';


function TourDescription() {
    return (
        <>
           <section className={classes.TourDescription}>
                <div className="row">
                    <div className={classes.TourDescription__content}>
                        <div className={classes.TourDescription__left}>
                            <h2>YOUR TOUR GUIDES</h2>
                            <div className={classes.TourDescription__users}>
                                <div className={classes.TourDescription__user}>
                                    <img src={user3} alt="user"/>
                                    <h3>Jonson Black</h3>
                                    <p><b>4.7</b> (136)</p>
                                </div>
                                <div className={classes.TourDescription__user}>
                                    <img src={user1} alt="user"/>
                                    <h3>Angela Smith</h3>
                                    <p><b>4.7</b> (136)</p>
                                </div>
                                <div className={classes.TourDescription__user}>
                                    <img src={user2} alt="user"/>
                                    <h3>Emily Watson</h3>
                                    <p><b>4.7</b> (136)</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.TourDescription__right}>
                            <h2>ABOUT THE FOREST HIKER TOUR</h2>
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default TourDescription