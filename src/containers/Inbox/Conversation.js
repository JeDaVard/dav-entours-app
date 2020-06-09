import React from "react";
import userImage from './img.jpeg';
import tourImg from './module-6.jpg';
import classes from './Conversation.module.css';
import Separator from "../../components/UI/Separator/Separator";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import Message from "./Message/Message";
import MessageInput from "./Message/MessageInput";

function Conversation() {
    return (
        <div className={classes.Conversation}>
            <div className={classes.Conversation__head}>
                <div className={classes.Conversation__user}>
                    <img src={userImage} alt="userName"/>
                    <h4>Vladislav The Poker</h4>
                </div>
                <div className="row">
                    <div className={classes.Conversation__tourTitle}>
                        <h2>Some amazing tour to the moon</h2>
                    </div>
                    <div className={classes.Conversation__tour}>
                            <div className={classes.Conversation__tourImage}>
                                <img src={tourImg} alt="tourImg"/>
                            </div>
                            <div className={classes.Conversation__tourDetail}>
                                <div className={classes.Conversation__tourName}>
                                    <p>Completed</p>
                                </div>
                                <div className={classes.Conversation__tourOrder}>
                                    <p>Sat, 21 Jan 2020</p>
                                </div>
                            </div>
                            <div className={classes.Conversation_tourButton}>
                                <SimpleButton to={'/'} primary>Details</SimpleButton>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={classes.Conversation__headRelative} />
            <div className={classes.Conversation__main}>
                <div className="row">
                    <Message />
                    <Message own/>
                    <Message />
                    <Message own/>
                    <Message />
                </div>
                <MessageInput />
            </div>
        </div>
    )
}

export default Conversation