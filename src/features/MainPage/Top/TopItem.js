import React from "react";
import moment from "moment";
import classes from './TopItem.module.css';
import Justicon from "../../../components/UI/JustIcon/Justicon";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

export default ({ user }) => (
    <div className={classes.userContainer}>
        <div className={classes.user}>
            <div className={classes.imageFrame}>
                <UserAvatar alt={user.name}
                            className={classes.userImage}
                            src={user.photo}/>
            </div>
            <div className={classes.userinfo}>
                <h3>
                    <Justicon icon={'award'} className={classes.userinfoImg}/>
                    {user.name.length > 21 ? user.name.slice(0,19)+'...' : user.name}</h3>
                <div className={classes.userinfoDetails}>
                    <p>Joined in {moment(user.createdAt).format('MMM YYYY')}</p>
                    <p>{user.tours.length ? <b>{user.tours.length}</b> : 'Doesn\'t have'} tours</p>
                    <p>Speaks - {user.speaks.map(lang => lang) }</p>
                </div>
            </div>
            <div className={classes.rating}>
                <Justicon icon={'star'}/>
                <h2>{user.tours.length ? user.tours.reduce((sum, val, index, arr) => +arr[index].ratingsAverage + sum, 0)/user.tours.length : '0'}</h2>
                <p>(<b>{user.reviews.length}</b>)</p>
            </div>
        </div>
    </div>
)