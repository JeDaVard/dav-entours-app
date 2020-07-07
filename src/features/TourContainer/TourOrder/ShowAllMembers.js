import React from "react";
import classes from "./ShowAllMembers.module.css";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Separator from "../../../components/UI/Separator/Separator";
import {Link} from "react-router-dom";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";

export default function ShowAllMembers(props) {
    return (
        <SmallShow
            handler={(trigger, opposite) => trigger(!opposite)}
            button={(
                <div className={classes.more}>
                    <Justicon
                        className={classes.moreIcon}
                        icon={'more-horizontal'} />
                </div>
            )}>
            <div className={classes.moreBlock}>
                <div className={classes.moreHead}>
                    <h2>All members</h2>
                </div>
                <Separator color={'normal'} />
                <div className={classes.moreParticipants}>
                    {props.start.participants.map(participant => (
                        <Link to={`/user/${participant._id}`}
                              className={classes.participantLink}
                              key={participant._id}
                        >
                            <img src={`${process.env.REACT_APP_SERVER}/images/user/${participant.photo}`}
                                 className={classes.photo}
                                 alt={participant.name}/>
                        </Link>
                    ))}
                </div>
            </div>
        </SmallShow>
    )
}