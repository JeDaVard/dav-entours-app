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
                    { data.conversations.map(conversation => (
                        <Link to={loc => ({...loc, pathname: `/inbox/${conversation._id}`, state: { convId: conversation._id}})} key={conversation._id}>
                            <div className={classes.InboxItem__conversation}>
                                <div className={classes.InboxItem__image}>
                                    <img src={`${process.env.REACT_APP_SERVER}/images/tour/${conversation.tour.imageCover}`} className={classes.InboxItem__tourImage} alt={conversation.tour.name}/>
                                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${conversation.guides[0].photo}`} className={classes.InboxItem__userImage} alt={conversation.guides[0].name}/>
                                </div>
                                <div className={classes.InboxItem__mainBlock}>
                                    <div className={classes.InboxItem__userName}>
                                        <h3>{conversation.guides[0].name}</h3>
                                        <div className={classes.InboxItem__date}>
                                            <h4>{moment(conversation).format('ddd DD MMM YYYY')}</h4>
                                            <Justicon icon={'chevron-right'} className={classes.InboxItem__dateArrow} />
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