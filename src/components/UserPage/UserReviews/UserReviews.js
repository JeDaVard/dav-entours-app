import React from "react";
import { connect } from 'react-redux';
import classes from './UserReviews.module.css';

const UserReviews = ({ reviews }) => {
    return (
        <section className={classes.UserPage__stuff}>
            <div className={classes.UserPage__reviews}>
                <h1>2 reviews</h1>

                <div className={classes.UserPage__reviewContent}>
                    <h6>Participated</h6>
                    <h5>Date</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis et nam nemo reiciendis repellendus sed ut veritatis. Ad dicta dolorum ducimus illum, laudantium pariatur quae totam vel vero!</p>
                    <div className={classes.UserPage__reviewer}>
                        <img src="https://a0.muscache.com/im/pictures/user/5a6ee89c-4f45-40a9-9f23-6f4c768fe18e.jpg?aki_policy=profile_large" alt="photo"/>
                        <div>
                            <p><b>Davit, Yerevan, Armenia</b></p>
                            <p>Joined 2018</p>
                        </div>
                    </div>
                </div>

                <div className={classes.UserPage__reviewContent}>
                    <h6>Participated</h6>
                    <h5>Date</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae debitis et nam nemo reiciendis repellendus sed ut veritatis. Ad dicta dolorum ducimus illum, laudantium pariatur quae totam vel vero!</p>
                    <div className={classes.UserPage__reviewer}>
                        <img src="https://a0.muscache.com/im/pictures/user/5a6ee89c-4f45-40a9-9f23-6f4c768fe18e.jpg?aki_policy=profile_large" alt="photo"/>
                        <div>
                            <p><b>Davit, Yerevan, Armenia</b></p>
                            <p>Joined 2018</p>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    reviews: state.user.user.data.reviews
})

export default connect(mapStateToProps)(UserReviews)