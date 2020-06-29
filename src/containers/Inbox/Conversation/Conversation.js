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
                const newMessage = subscriptionData.data.messageAdded;
                // the filter below: now when in general messages query
                // we have a fetchPolicy "network-only", we can't remove
                // the optimistic response automatically I guess, so here
                // we remove it manually just at a time the message from sub is arrived
                const oldMessages = prev.me.conversation.messages.messages.filter(m => !m._id.startsWith('optimistic'))
                return Object.assign({}, prev, {
                        me: {
                            ...prev.me,
                            conversation: {
                                ...prev.me.conversation,
                                messages: {
                                    ...prev.me.conversation.messages,
                                    messages: [...oldMessages, newMessage]
                                }
                            }
                        }
                    }
                );
            }
        })

    const { conversation } = data.me
    return (
        <div className={classes.Conversation}>
            <ConversationHead
                tour={conversation.tour}
                participants={conversation.participants}
                guides={conversation.guides}
            />
            <div className={classes.main}>
                    <Query query={FETCH_MESSAGES}
                           variables={{id, limit: 12}}
                           fetchPolicy="network-only"
                           >
                        {({subscribeToMore, ...result}) => {
                            if (result.loading) return <div style={{marginTop: '14.4rem'}}><DotLoading /></div>
                            if (result.error) return <h1>{result.error.message}</h1>
                            const { hasMore, messages } = result.data.me.conversation.messages
                            return (
                                    <Messages
                                             convId={id}
                                             hasMore={hasMore}
                                             data={messages || []}
                                             guides={conversation.guides || []}
                                             subscribeToMessages={() => sub(subscribeToMore)}
                                             onLoadMore={async () => {
                                                 if (hasMore) {
                                                     return result.fetchMore({
                                                         variables: {
                                                             page: result.data.me.conversation.messages.nextPage,
                                                             limit: hasMore ? 12 : 0
                                                         },
                                                         updateQuery: (prev, { fetchMoreResult }) => {
                                                             if (!fetchMoreResult) return prev;
                                                             if (!fetchMoreResult.me.conversation.messages.messages) return;
                                                             const mergedMessages = [
                                                                 ...prev.me.conversation.messages.messages,
                                                                 ...fetchMoreResult.me.conversation.messages.messages
                                                             ];

                                                             return Object.assign({}, prev, {
                                                                 me: {
                                                                     conversation: {
                                                                         ...fetchMoreResult.me.conversation,
                                                                         messages: {
                                                                             ...fetchMoreResult.me.conversation.messages,
                                                                             messages: _.uniqBy(mergedMessages, function (e) {
                                                                                     return e._id;
                                                                                 })

                                                                         }
                                                                     },
                                                                     __typename: 'Me'
                                                                 }
                                                             })
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
            <div className={classes.bottom}>
                <MessageInput convId={id} />
            </div>
        </div>
    )
}

export default Conversation