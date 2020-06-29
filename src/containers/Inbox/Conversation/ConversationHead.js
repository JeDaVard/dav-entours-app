import classes from "./ConversationHead.module.css";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import React from "react";
import {Link} from "react-router-dom";
import SimpleMobileTop from "../../Make/SimpleMobileTop";

function ConversationHead({guides, participants, tour}) {
    return (
        <div className={classes.ConversationHead__head}>
                {/*<NavButton to={'/inbox'} />*/}

             <SimpleMobileTop
                    to={`/inbox`}
                    button={''}
                    type={'submit'}
                    icon={'more-horizontal'}
                    inverseButton
                    // loading={loading}
                    // top
                    // disabled
                >
                 <div className={classes.ConversationHead__user}>
                     <img src={`${process.env.REACT_APP_SERVER}/images/user/${guides[0].photo}`} alt={guides[0].name}/>
                     <Link to={`/user/${guides[0]._id}`}>
                         <h4>{guides[0].name}</h4>
                     </Link>
                 </div>
             </SimpleMobileTop>
            <div className="row">
                <div className={classes.ConversationHead__tourTitle}>
                    <h2>{tour.name}</h2>
                </div>
                <div className={classes.ConversationHead__tour}>
                    <div className={classes.ConversationHead__tourImage}>
                        <img src={`${process.env.REACT_APP_CDN}/${tour.imageCover}`} alt={tour.name} />
                    </div>
                    <div className={classes.ConversationHead__tourDetail}>
                        <div className={classes.ConversationHead__tourName}>
                            <p>Completed</p>
                        </div>
                        <div className={classes.ConversationHead__tourOrder}>
                            <p>Sat, 21 Jan 2020</p>
                        </div>
                    </div>
                    <div className={classes.ConversationHead__tourButton}>
                        <SimpleButton to={`/tour/${tour.slug}`} primary>Details</SimpleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationHead