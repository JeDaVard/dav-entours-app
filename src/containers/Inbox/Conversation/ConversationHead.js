import classes from "./Conversation.module.css";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import React from "react";
import {Link} from "react-router-dom";
import NavButton from "./NavButton/NavButton";

function ConversationHead({guides, participants, tour}) {
    return (
        <div className={classes.Conversation__head}>
                <NavButton to={'/inbox'} />
                <div className={classes.Conversation__user}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${guides[0].photo}`} alt={guides[0].name}/>
                    <Link to={`/user/${guides[0]._id}`}>
                        <h4>{guides[0].name}</h4>
                    </Link>
                </div>
            <div className="row">
                <div className={classes.Conversation__tourTitle}>
                    <h2>{tour.name}</h2>
                </div>
                <div className={classes.Conversation__tour}>
                    <div className={classes.Conversation__tourImage}>
                        <img src={`${process.env.REACT_APP_SERVER}/images/tour/${tour.imageCover}`} alt={tour.name} />
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
                        <SimpleButton to={`/tour/${tour.slug}`} primary>Details</SimpleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationHead