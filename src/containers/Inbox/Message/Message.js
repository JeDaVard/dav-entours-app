import React from "react";
import classes from './Message.module.css';
import moment from "moment";
import {Link} from "react-router-dom";

function Message({data: {text, createdAt, sender}, own, guide}) {
    return (
        <div className={`${classes.Message} ${own && classes.Message__own}`}>
            <div className={`${classes.Message__author} ${own && classes.Message__authorOwn}`}>
                <Link to={`/user/${sender._id}`}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${sender.photo}`}
                         className={guide && classes.Message__authorGuide}
                         alt=""/>
                </Link>
            </div>
            <div className={`${classes.Message__text} ${own && classes.Message__textOwn}`}>
                <p>
                    {text}
                </p>
                <h4>{moment(createdAt).format('ddd DD MMM YYYY')}</h4>
            </div>
        </div>
    )
}

export default Message