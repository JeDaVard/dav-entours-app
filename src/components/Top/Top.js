import React from "react";
import classes from './Top.module.css';
import user from './user.jpg'

function Top() {
    return (
        <section className={classes.Top}>
            <div className="row">
                    <div className={classes.Top__title}>
                        <h3>Top tourmakers</h3>
                        <p>Monthly most active tourmaker</p>
                    </div>
                <div className={classes.Top__content}>

                        <div className={classes.Top__usercontainer}>
                            <div className={classes.Top__user}>
                                <div>
                                    <img src={user} alt="user"/>
                                </div>
                                <div className={classes.Top__userinfo}>
                                    <h3><img src={user} alt=""/> John Wick</h3>
                                    <p>Joined in 2018</p>
                                    <p>Speaks Engish, French</p>
                                    <p>8 Tours</p>
                                </div>
                                <div className={classes.Top__rating}>
                                    <img src={user} alt="user"/>
                                    <h2>4.8</h2>
                                    <p>(127)</p>
                                </div>
                            </div>
                        </div>

                    <div className={classes.Top__usercontainer}>
                        <div className={classes.Top__user}>
                            <div>
                                <img src={user} alt="user"/>
                            </div>
                            <div className={classes.Top__userinfo}>
                                <h3><img src={user} alt=""/> John Wick</h3>
                                <p>Joined in 2018</p>
                                <p>Speaks Engish, French</p>
                                <p>8 Tours</p>
                            </div>
                            <div className={classes.Top__rating}>
                                <img src={user} alt="user"/>
                                <h2>4.8</h2>
                                <p>(127)</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.Top__usercontainer}>
                        <div className={classes.Top__user}>
                            <div>
                                <img src={user} alt="user"/>
                            </div>
                            <div className={classes.Top__userinfo}>
                                <h3><img src={user} alt=""/> John Wick</h3>
                                <p>Joined in 2018</p>
                                <p>Speaks Engish, French</p>
                                <p>8 Tours</p>
                            </div>
                            <div className={classes.Top__rating}>
                                <img src={user} alt="user"/>
                                <h2>4.8</h2>
                                <p>(127)</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.Top__usercontainer}>
                        <div className={classes.Top__user}>
                            <div>
                                <img src={user} alt="user"/>
                            </div>
                            <div className={classes.Top__userinfo}>
                                <h3><img src={user} alt=""/> John Wick</h3>
                                <p>Joined in 2018</p>
                                <p>Speaks Engish, French</p>
                                <p>8 Tours</p>
                            </div>
                            <div className={classes.Top__rating}>
                                <img src={user} alt="user"/>
                                <h2>4.8</h2>
                                <p>(127)</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Top