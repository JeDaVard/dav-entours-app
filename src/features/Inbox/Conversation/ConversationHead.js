import classes from "./ConversationHead.module.css";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import React from "react";
import {Link} from "react-router-dom";
import SimpleMobileTop from "../../../components/SimpleMobileTop/SimpleMobileTop";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";
import moment from "moment";

function ConversationHead({guides, participants, tour, date}) {
    return (
        <div className={classes.head}>
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
                 <div className={classes.user}>
                     <UserAvatar alt={guides[0].name}
                                 src={guides[0].photo}/>
                     <Link to={`/user/${guides[0]._id}`}>
                         <h4>{guides[0].name}</h4>
                     </Link>
                 </div>
             </SimpleMobileTop>
            <div className="row">
                <div className={classes.tourTitle}>
                    <h2>{tour.name}</h2>
                </div>
                <div className={classes.tour}>
                    <div className={classes.tourImage}>
                        <img src={`${process.env.REACT_APP_CDN}/${tour.imageCover}`} alt={tour.name} />
                    </div>
                    <div className={classes.tourDetail}>
                        <div className={classes.tourName}>
                            {date < +Date.now() ? (
                                <p>Completed</p>
                            ) : (
                                <p style={{color: '#3ac87f'}}>Ongoing</p>
                            )}
                        </div>
                        <div className={classes.tourOrder}>
                            <h4> Starts at{' '}
                                {moment(+date).format(
                                    'ddd DD | HH:00'
                                )}
                            </h4>
                        </div>
                    </div>
                    <div className={classes.tourButton}>
                        <SimpleButton to={`/tour/${tour.slug}`} primary>Details</SimpleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationHead