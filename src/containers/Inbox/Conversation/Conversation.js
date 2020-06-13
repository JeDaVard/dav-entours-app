import React from "react";
import {useQuery, Query} from "react-apollo";
import {FETCH_CONVERSATION, FETCH_MESSAGES} from './queries';
import { useParams } from "react-router-dom";
import classes from './Conversation.module.css';
import Message from "../Message/Message";
import MessageInput from "../Message/MessageInput";
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import { getCookie } from "../../../utils/cookies";
import ConversationHead from "./ConversationHead";

function Conversation() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(FETCH_CONVERSATION, {
        variables: { id }
    });

    if (loading) return <TopLoading />
    if (error) return <h2>Error while fetching conversation</h2>

    const { conversation } = data
    return (
        <div className={classes.Conversation}>
            <ConversationHead
                tour={conversation.tour}
                participants={conversation.participants}
                guides={conversation.guides}
            />
            <div className={classes.Conversation__main}>
                <div className={classes.Conversation__headRelative} />
                <div className="row">
                    <Query query={FETCH_MESSAGES} variables={{id}}>
                        {({loading, error, data}) => {
                            if (loading) return <h1>Loading...</h1>
                            if (error) return <h1>{error.message}</h1>
                            return (
                                <>
                                    {data.messages.map(message => (
                                        <Message
                                                 key={message._id}
                                                 data={message}
                                                 guide={conversation.guides.find(p => p._id === message.sender._id)}
                                                 own={message.sender._id === getCookie('userId')}
                                        />
                                    ))}
                                </>
                            )
                        }}
                    </Query>
                </div>
                <div className={classes.Conversation__inputPlaceHolder}/>
            </div>
            <div className={classes.Conversation__bottom}>
                <MessageInput convId={id} />
            </div>
        </div>
    )
}

export default Conversation