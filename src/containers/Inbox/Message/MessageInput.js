import React, { useState } from "react";
import classes from './MessageInput.module.css';
import Justicon from "../../../components/UI/Justicon";
import { Mutation } from "react-apollo";
import { FETCH_MESSAGES, SEND_MESSAGE} from "../Conversation/queries";
import {getCookie} from "../../../utils/cookies";
import WaveLoading from "../../../components/UI/WaveLoading/WaveLoading";

function MessageInput({ convId }) {
    const [ text, setText ] = useState('');

    return (
        <Mutation
            mutation={SEND_MESSAGE}
            optimisticResponse={{
                sendMessage: {
                    success: true,
                    code: '200',
                    message: 'Successfully sent',
                    data: {
                        _id: 'optimisticID' + Math.floor((Math.random() * 1000000)),
                        text: text,
                        isImage: false,
                        createdAt: Date.now(),
                        sender: {
                            _id: getCookie('userId'),
                            name: 'Sending',
                            photo: localStorage.getItem('photo'),
                            __typename: 'User',
                        },
                        __typename: "Message",
                    },
                    __typename: 'MessageMutationResponse'
                },
            }}
            update={(cache, { data: { sendMessage } }) => {
                // the line below checks the new message sent, if it is an optimistic
                // we update the cache, but we pass it await if it is the real one from the
                // server. That's because we have receive the real one by a subscription
                // So we'll have a copy of the same message if we update the cache for the real one too
                // console.log(sendMessage)
                if (sendMessage.data._id.startsWith('optimistic')) {
                    const { me } = cache.readQuery({ query: FETCH_MESSAGES, variables: {id: convId, limit: 12} });
                    const messages = me.conversation.messages.messages
                    cache.writeQuery({
                        query: FETCH_MESSAGES,
                        variables: {id: convId, limit: 12 },
                        data: { me: {
                                ...me,
                                conversation: {
                                    ...me.conversation,
                                    messages: {
                                        ...me.conversation.messages,
                                        messages: [...messages, sendMessage.data]
                                    }
                                }
                            }},
                    });
                }
            }}
        >
            {(sendMessage, { loading }) => (
            <div className={classes.MessageInput}>
                <div className={classes.MessageInput__content}>
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target

                        target.message.value = '';
                        setText('');

                        sendMessage({variables: { convId, text }})

                             }}
                        className={classes.MessageInput__form}
                    >
                        <div className={classes.MessageInput__sendPhoto}>
                            <Justicon icon={'camera'} className={classes.MessageInput__sendPhotoIcon} />
                        </div>
                        <input type="text" placeholder={'Text'} name={'message'} onChange={(e) => setText(e.target.value)} className={classes.MessageInput__input} autoComplete="off"/>
                        <button type={'submit'} className={classes.MessageInput__sendPhoto}>
                            {loading ? <WaveLoading /> : <Justicon icon={'send'} className={classes.MessageInput__sendIcon} />}
                        </button>
                    </form>
                </div>
            </div>
            )}
        </Mutation>
    )
}

export default MessageInput