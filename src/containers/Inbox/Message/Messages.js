import React, {useEffect} from "react";
import Message from "./Message";
import {Subscription, useSubscription } from "react-apollo";
import { getCookie } from "../../../utils/cookies";
import {SUBSCRIBE_MESSAGE} from "../Conversation/queries";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";

function Messages(props) {
    const { convId, guides, data, subscribeToNewComments } = props;

    useEffect(() => {
        subscribeToNewComments()
    },[])
    return (
        <>
            {data.map(message => (
                <Message
                    key={message._id}
                    data={message}
                    guide={guides.find(p => p._id === message.sender._id)}
                    own={message.sender._id === getCookie('userId')}
                />
            ))}
        </>
    )
}

export default Messages