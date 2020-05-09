import React from "react";
import ContentLoader from "react-content-loader";
import classes from './PopularItem.module.css';
import image2 from "./2.jpg";
import image4 from "./user.jpg";

export default ({popular}) => {
return(
    <div className={classes.Popular__tourcontainer}>
        <div className={classes.Popular__tour}>
            <div className={classes.Popular__image}>
                <img src={`http://localhost:5000/images/tour/${popular.imageCover}`} alt={popular.name}/>
                {new Date() - new Date(popular.createdAt) < 30*24*60*60*1000 && <div className={classes.new}><p>NEW</p></div>}
                <div className={classes.Popular__price}><p>$299 | {popular.duration} days</p></div>
                <div className={classes.Popular__title}>
                    <b>{popular.name}</b>
                </div>
            </div>
            <div className={classes.Popular__bottom}>
                <a href="/" className={classes.Popular__user}>
                    <img src={`http://localhost:5000/images/user/${popular.author.photo}`} alt="user"/>
                    <p>{popular.author.name}</p>
                </a>
                <div className={classes.Popular__date}>
                    {new Date(popular.startDates[0]).toDateString()}
                </div>
                <div className={classes.Popular__loc}>
                    {popular.startLocation.description}
                </div>
            </div>
        </div>
    </div>
)}