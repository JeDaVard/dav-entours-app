import React from 'react';
import { Query } from 'react-apollo';
import { FETCH_INBOXES } from './queries'
import moment from "moment";
import classes from "./InboxItem.module.css";
import Justicon from "../../components/UI/Justicon";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import {Link} from "react-router-dom";

function InboxItem() {
    return (
        <Query query={FETCH_INBOXES}>
            {({loading, error, data}) => {
                if (loading) return <TopLoading />
                if (error) return <h2>{error.message}. Error while fetching inboxes, please try later</h2>
                return <>
                    { data.me.conversations.map(conversation => (
                        <Link to={loc => ({...loc, pathname: `/inbox/${conversation._id}`, state: { convId: conversation._id}})} key={conversation._id}>
                            <div className={classes.conversation}>
                                <div className={classes.image}>
                                    <img src={`${process.env.REACT_APP_CDN}/${conversation.tour.imageCover}`} className={classes.tourImage} alt={conversation.tour.name}/>
                                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${conversation.guides[0].photo}`} className={classes.userImage} alt={conversation.guides[0].name}/>
                                </div>
                                <div className={classes.mainBlock}>
                                    <div className={classes.userName}>
                                        <h3>{conversation.guides[0].name}</h3>
                                        <div className={classes.date}>
                                            <h4>{moment(conversation).format('ddd DD MMM YYYY')}</h4>
                                            <Justicon icon={'chevron-right'} className={classes.dateArrow} />
                                        </div>
                                    </div>
                                    <h2>{conversation.tour.name}</h2>
                                    <div>
                                        { conversation.lastMessage ? (
                                            <p>
                                                <b>{conversation.lastMessage.sender.name.split(' ')[0]}: </b>{conversation.lastMessage.text.length > 26 ? conversation.lastMessage.text.slice(0,26) + '...' : conversation.lastMessage.text}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </>
            }}
        </Query>
    )
}

export default InboxItem