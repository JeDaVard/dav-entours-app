import React from 'react';
import {Query, useSubscription} from 'react-apollo';
import { FETCH_INBOXES } from './queries'
import moment from "moment";
import classes from "./InboxItem.module.css";
import Justicon from "../../components/UI/Justicon";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import {Link} from "react-router-dom";
import {SUBSCRIBE_MESSAGE} from "./Conversation/queries";

function InboxItem() {
    // const a = useSubscription(SUBSCRIBE_MESSAGE, {
    //     variables: {
    //
    //     }
    // })
    //
    // console.log(a)

    return (
        <Query query={FETCH_INBOXES}>
            {({loading, error, data}) => {
                if (loading) return <TopLoading />
                if (error) return <h2>{error.message}. Error while fetching inboxes, please try later</h2>

                return <>
                    { data.me.conversations.map(conversation => {

                        let lastMessage = null;
                        if (conversation.lastMessage) {
                            let lastM = null;
                            if (conversation.lastMessage.isImage) {
                                lastM = 'Sent a photo'
                            } else {
                                lastM = conversation.lastMessage.text.length > 23
                                    ? conversation.lastMessage.text.slice(0,20) + '...'
                                    : conversation.lastMessage.text
                            }
                            const name = conversation.lastMessage.sender.name.split(' ')[0];
                            const lastMessageAuthor = name.length > 10 ? name.slice(0, 7) + '...' : name;

                            lastMessage = (
                                <p>
                                    <b>{lastMessageAuthor}: </b>{lastM}
                                </p>
                            )
                        }

                        return (
                        <Link to={loc => ({...loc, pathname: `/inbox/${conversation._id}`, state: { convId: conversation._id}})} key={conversation._id}>
                            <div className={classes.conversation}>
                                <div className={classes.image}>
                                    <img src={`${process.env.REACT_APP_CDN}/${conversation.tour.imageCover}`}
                                         className={classes.tourImage}
                                         alt={conversation.tour.name}/>
                                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${conversation.start.staff[0].photo}`}
                                         className={classes.userImage}
                                         alt={conversation.start.staff[0].name}/>
                                </div>
                                <div className={classes.mainBlock}>
                                    <div className={classes.userName}>
                                        <h3>{conversation.start.staff[0].name}</h3>
                                        <div className={classes.date}>
                                            <h4>{moment(conversation).format('ddd DD MMM YYYY')}</h4>
                                            <Justicon icon={'chevron-right'} className={classes.dateArrow} />
                                        </div>
                                    </div>
                                    <h2>{conversation.tour.name}</h2>
                                    <div>
                                        {lastMessage}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )})}
                    </>
            }}
        </Query>
    )
}

export default InboxItem