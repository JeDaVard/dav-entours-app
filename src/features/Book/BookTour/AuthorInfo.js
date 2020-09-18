import React from "react";
import classes from "./AuthorInfo.module.css";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import moment from "moment";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

export default function AuthorInfo(props) {
    const { author } = props;
    return (
        <div className={classes.authorInfo}>
            <div className={classes.authorInfoMain}>
                <div className={classes.authorPhotoBigFrame}>
                    <UserAvatar src={author.photo}
                         className={classes.authorPhotoBig}
                         alt={author.name}/>
                    <div className={classes.authorAward}>
                        <Justicon icon={'award'} className={classes.authorAwardIcon}/>
                    </div>
                </div>
                <div className={classes.authorID}>
                    <div className={classes.authorName}>
                        <Justicon icon={'star'} className={classes.authorNameIcon}/>
                        <h3>{author.name}</h3>
                    </div>
                    <div className={classes.authorSpeaks}>
                        <h5>Languages {author.speaks}</h5>
                    </div>
                    <div className={classes.authorJoined}>
                        <h4>Joined in {moment(+author.createdAt).format('MM YYYY')}</h4>
                    </div>
                </div>
            </div>
            <p className={classes.authorMission}>{author.mission}. Welcome to our great tour! Hope you'll enjoy it</p>
        </div>
    )
}