import React from "react";
import { Link } from "react-router-dom";
import classes from './PopularItem.module.css';

export default ({popular}) => {
return(
    <div className={classes.Popular__tourcontainer}>
        <div className={classes.Popular__tour}>
            <div className={classes.Popular__image}>
                <Link to={{pathname: `/tour/${popular.slug}`, state: popular }} ><img src={`${process.env.REACT_APP_SERVER}/images/tour/${popular.imageCover}`} alt={popular.name}/></Link>
                {new Date() - new Date(popular.createdAt) < 30*24*60*60*1000 && <div className={classes.new}><p>NEW</p></div>}
                <div className={classes.Popular__price}><h3>${popular.price}</h3><p>{popular.duration} days</p></div>
                <Link to={{pathname: `/tour/${popular.slug}`, state: popular }} ><div className={classes.Popular__title}>
                    <b>{popular.name}</b>
                </div></Link>
            </div>
            <div className={classes.Popular__bottom}>
                <Link to={`/user/${popular.author._id}`}  className={classes.Popular__user}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${popular.author.photo}`} alt="user"/>
                    <p>{popular.author.name}</p>
                </Link>
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