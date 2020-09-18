import React from "react";
import classes from "./FakeConversation.module.css";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

export default function FakeConversation(props) {
    const { one, second, setMessage, message, messageRef } = props;
    return (
        <>
            <div className={classes.oneWelcome}>
                <div className={classes.onePhotoFrame}>
                    <UserAvatar src={one.photo}
                                className={classes.onePhoto}
                                alt={one.name}/>
                </div>
                <div className={classes.message}>
                    <p>{message}</p>
                </div>
            </div>
            <div className={classes.secondHello}>
                <div className={classes.onePhotoFrame}>
                    <UserAvatar src={second.photo}
                                className={classes.onePhoto}
                                alt={second.name}/>
                </div>
                <textarea
                    ref={messageRef}
                    onChange={e => { const value = e.target.value; setMessage(value)}}
                    rows={'4'}
                    placeholder={`Hello! I am ${second.name}. I can't wait to join you ...`}
                    className={`${classes.message} ${classes.secondMessage}`}/>
            </div>
        </>
    )
}