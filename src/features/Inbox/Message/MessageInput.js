import React, { useState } from "react";
import classes from './MessageInput.module.css';
import Justicon from "../../../components/UI/JustIcon/Justicon";
import { Mutation } from "@apollo/client/react/components";
import { FETCH_MESSAGES, SEND_MESSAGE} from "../Conversation/queries";
import {getCookie} from "../../../utils/cookies";
import {useMutation} from "@apollo/client";
import WaveLoading from "../../../components/UI/WaveLoading/WaveLoading";
import {UPLOAD_IMAGE} from "../../Make/queries";
import axios from "axios";

function MessageInput({ convId }) {
    const [ input, setInput ] = useState({text: '', photo: null});
    const [ signURL ] = useMutation(UPLOAD_IMAGE);
    const [ uLoading, setULoading ] = useState(false)

    const optimisticResponse = {
        sendMessage: {
            success: true,
            code: '200',
            message: 'Successfully sent',
            data: {
                _id: 'optimisticID' + Math.floor((Math.random() * 1000000)),
                text: input.text,
                isImage: false,
                createdAt: Date.now(),
                sender: {
                    _id: getCookie('userId'),
                    name: 'Sending...',
                    photo: localStorage.getItem('photo'),
                    __typename: 'User',
                },
                __typename: "Message",
            },
            __typename: 'MessageMutationResponse'
        },
    };

    const updateMessages = (cache, { data: { sendMessage } }) => {
        // the line below checks the new message sent, if it is an optimistic
        // we update the cache, but we pass it await if it is the real one from the
        // server. That's because we have receive the real one by a subscription
        // So we'll have a copy of the same message if we update the cache for the real one too
        if (sendMessage.data._id.startsWith('optimistic')) {
            const { me } = cache.readQuery({ query: FETCH_MESSAGES, variables: {id: convId, limit: 12} });
            const messages = me.conversation.messages.data

            cache.writeQuery({
                query: FETCH_MESSAGES,
                variables: {id: convId, limit: 12 },
                data: { me: {
                        ...me,
                        conversation: {
                            ...me.conversation,
                            lastMessage: {
                                ...me.conversation.lastMessage,
                                text: sendMessage.data.text,
                                isImage: sendMessage.data.isImage,
                                // TODO when we just create a start and send a message in an EMPTY chat, we get can't get sender of null
                                sender: {
                                    ...me.conversation.lastMessage.sender,
                                    sender: sendMessage.data.sender.name
                                }
                            },
                            messages: {
                                ...me.conversation.messages,
                                data: [...messages, sendMessage.data]
                            }
                        }
                    }},
            });
        }
    }


    const [ sendImage ] = useMutation(SEND_MESSAGE);

    const sendPhotoHandler = async e => {
        setULoading(true)
        const file = e.target.files[0];

        const res = await signURL({
            variables: {
                fileName: `photo_${Date.now()}.jpg`,
                contentType: file.type,
                id: convId,
                genre: 'conversations'
            }
        });

        const { key, url } = res.data.uploadImage;

        await axios.put(url, file,{
            headers: {
                'Content-Type': file.type
            },
        })

        setTimeout(async () => {
            await sendImage({
                variables: {
                    convId,
                    text: key,
                    isImage: true
                }
            });

        setULoading(false);
        }, 2000)
    }

    return (
        <Mutation
            mutation={SEND_MESSAGE}
            optimisticResponse={optimisticResponse}
            update={updateMessages}
        >
            {(sendMessage, { loading }) => (
            <div className={classes.MessageInput}>
                <div className={classes.content}>
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target

                        target.message.value = '';
                        setInput(p => ({...p, text: ''}));

                        sendMessage({variables: { convId, text: input.text }})

                             }}
                        className={classes.form}
                    >
                        <div className={classes.sendPhoto}>
                            <label htmlFor="sendPhoto">
                                {uLoading
                                    ? <WaveLoading />
                                    : <Justicon icon={'camera'} className={classes.sendPhotoIcon} />}
                            </label>
                            <input type="file"
                                   onChange={sendPhotoHandler}
                                   id="sendPhoto"
                                   multiple={false}
                                   accept="image/*"
                            />
                        </div>
                        <input type="text"
                               placeholder={'Text'}
                               name={'message'}
                               onChange={(e) => {
                                   const text = e.target.value;
                                   setInput(p => ({...p, text}))
                               }}
                               className={classes.input} autoComplete="off"/>
                        <button type={'submit'} className={classes.sendPhoto}>
                            {loading ? <WaveLoading /> : <Justicon icon={'send'} className={classes.sendIcon} />}
                        </button>
                    </form>
                </div>
            </div>
            )}
        </Mutation>
    )
}

export default MessageInput