import React from "react";
import { useQuery } from "react-apollo";
import { FETCH_CONVERSATION } from './queries';
import { useParams } from "react-router-dom";
import classes from './Conversation.module.css';
import Message from "../Message/Message";
import MessageInput from "../Message/MessageInput";
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import {getCookie} from "../../../utils/cookies";
import ConversationHead from "./ConversationHead";

function Conversation() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(FETCH_CONVERSATION, {
        variables: { id }
    })

    if (loading) return <TopLoading />
    if (error) return <h2>Error while fetching conversation</h2>

    return (
        <div className={classes.Conversation}>
            <ConversationHead
                tour={data.conversation.tour}
                participants={data.conversation.participants}
                guides={data.conversation.guides}
            />
            <div className={classes.Conversation__main}>
                <div className={classes.Conversation__headRelative} />
                <div className="row">
                    {data.conversation.messages.map(message => (
                        <Message key={message._id}
                                 data={message}
                                 guide={data.conversation.guides.find(p => p._id === message.sender._id)}
                                 own={message.sender._id === getCookie('userId')}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.Conversation__bottom}>
                <MessageInput />
            </div>
        </div>
    )
}

export default Conversation