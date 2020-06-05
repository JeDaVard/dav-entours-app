import React from "react";
import moment from "moment";
import classes from './TopItem.module.css';
import Justicon from "../../UI/Justicon";

export default ({ user }) => (
    <div className={classes.Top__usercontainer}>
        <div className={classes.Top__user}>
            <div className={classes.Top__imageFrame}>
                <img src={`${process.env.REACT_APP_SERVER}/images/user/${user.photo}`} alt={user.name} className={classes.Top__userImage}/>
            </div>
            <div className={classes.Top__userinfo}>
                <h3>
                    <Justicon icon={'award'} className={classes.Top__userinfoImg}/>
                    {user.name.length > 21 ? user.name.slice(0,19)+'...' : user.name}</h3>
                <div className={classes.Top__userinfoDetails}>
                    <p>Joined in {moment(user.createdAt).format('MMM YYYY')}</p>
                    <p>{user.tours.length ? <b>{user.tours.length}</b> : 'Doesn\'t have'} tours</p>
                    <p>Speaks - {user.speaks.map(lang => lang) }</p>
                </div>
            </div>
            <div className={classes.Top__rating}>
                <Justicon icon={'star'}/>
                <h2>{user.tours.length ? user.tours.reduce((sum, val, index, arr) => +arr[index].ratingsAverage + sum, 0)/user.tours.length : '0'}</h2>
                <p>(<b>{user.reviews.length}</b>)</p>
            </div>
        </div>
    </div>
)