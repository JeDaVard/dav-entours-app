import React from "react";
import {useQuery, Query} from "react-apollo";
import {FETCH_CONVERSATION, FETCH_MESSAGES, SUBSCRIBE_MESSAGE} from './queries';
import { useParams } from "react-router-dom";
import classes from './Conversation.module.css';
import MessageInput from "../Message/MessageInput";
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import ConversationHead from "./ConversationHead";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";
import Messages from "../Message/Messages";
import _ from 'lodash';


function Conversation() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(FETCH_CONVERSATION, {
        variables: { id }
    });

    if (loading) return <TopLoading />
    if (error) return <h2>Error while fetching conversation</h2>

    const sub = (par) =>
        par({
            document: SUBSCRIBE_MESSAGE,
            variables: { id },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.messageAdded;
                // return {messages: [...prev.messages, newFeedItem]}
                return Object.assign({}, prev, {
                        messages: [...prev.messages, newFeedItem]
                    }
                );
            }
        })

    const { conversation } = data
    return (
        <div className={classes.Conversation}>
            <ConversationHead
                tour={conversation.tour}
                participants={conversation.participants}
                guides={conversation.guides}
            />
            <div className={classes.Conversation__main}>
                    <Query query={FETCH_MESSAGES}
                           variables={{id}}
                           // notifyOnNetworkStatusChange={true}
                           >
                        {({subscribeToMore, ...result}) => {
                            if (result.loading) return <div style={{marginTop: '13.4rem'}}><DotLoading /></div>
                            if (result.error) return <h1>{error.message}</h1>
                            return (
                                    <Messages
                                             convId={id}
                                             data={result.data.messages || []}
                                             guides={conversation.guides || []}
                                             subscribeToNewComments={() => sub(subscribeToMore)}
                                             onLoadMore={(page) => {
                                                 if (page > 1) {
                                                     return result.fetchMore({
                                                         variables: {
                                                             page
                                                         },
                                                         updateQuery: (prev, { fetchMoreResult }) => {
                                                             if (!fetchMoreResult) return prev;

                                                             const merged = [...prev.messages, ...fetchMoreResult.messages]

                                                             return Object.assign({}, prev, {
                                                                 messages: _.uniqBy(merged, function (e) {
                                                                     return e._id;
                                                                 })
                                                             });
                                                         }
                                                     })
                                                 }
                                             }
                                         }
                                    />
                            )
                        }}
                    </Query>
            </div>
            <div className={classes.Conversation__bottom}>
                <MessageInput convId={id} />
            </div>
        </div>
    )
}

export default Conversation