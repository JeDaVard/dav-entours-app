import React from "react";
import classes from './TopItem.module.css';
import user from "./user.jpg";

export default ({ user }) => (
    <div className={classes.Top__usercontainer}>
        <div className={classes.Top__user}>
            <div className={classes.Top__userImage}>
                <img src={`http://localhost:5000/images/user/${user.photo}`} alt={user.name}/>
            </div>
            <div className={classes.Top__userinfo}>
                <h3><img src={`http://localhost:5000/images/user/${user.photo}`} alt=""/>{user.name.slice(0,19)}...</h3>
                <p>Joined in {new Date(user.createdAt).getMonth() + '/' + new Date(user.createdAt).getFullYear()}</p>
                <p>Speaks - {user.speaks.map(lang => lang) }</p>
                <p>{user.tours.length ? <b>{user.tours.length}</b> : 'Doesn\'t have'} tours</p>
            </div>
            <div className={classes.Top__rating}>
                <img src={`http://localhost:5000/images/user/${user.photo}`} alt="user"/>
                <h2>{user.tours.length ? user.tours.reduce((sum, val, index, arr) => arr[index].ratingsAverage + sum, 0)/user.tours.length : '0'}</h2>
                <p>(<b>{user.reviews.length || '0'}</b>)</p>
            </div>
        </div>
    </div>
)