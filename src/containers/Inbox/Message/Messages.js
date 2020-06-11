import React from "react";
import {FETCH_MESSAGES} from "../Conversation/queries";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import { Query } from "react-apollo";

function Messages(props) {
    const { id, guides } = props;

    return (
        <Query query={FETCH_MESSAGES} variables={{ id }}>
            {({loading, error, data}) => {
                if (loading) return <h1>Loading...</h1>
                if (error) return <h1>{error.message}</h1>
                return (
                    <>
                        {data.messages.map(message => (
                            <Message key={message._id}
                                     data={message}
                                     guide={guides.find(p => p._id === message.sender._id)}
                                     own={message.sender._id === getCookie('userId')}
                            />
                        ))}
                    </>
                )
            }}
        </Query>
    )
}

export default Messages