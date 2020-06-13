import React from "react";
import classes from './Message.module.css';
import moment from "moment";
import {Link} from "react-router-dom";
import Justicon from "../../../components/UI/Justicon";
import {useMutation} from "@apollo/react-hooks";
import { REMOVE_MESSAGE } from "../Conversation/queries";

function Message({data: {text, createdAt, sender, _id }, own, guide}) {
    const [mutate] = useMutation(REMOVE_MESSAGE, {
            optimisticResponse: {
                removeMessage: {
                    _id,
                    text: '[Removed]',
                    createdAt: createdAt,
                    sender: {
                        _id: sender._id,
                        name: sender.name,
                        photo: sender.photo,
                        __typename: 'User',
                    },
                    __typename: "Message",
                },
                __typename: "Mutation",
            },
    });

    return (
        <div className={`${classes.Message} ${own ? classes.Message__own : ''}`}>
            <div className={`${classes.Message__author} ${own ? classes.Message__authorOwn  : ''}`}>
                <Link to={`/user/${sender._id}`}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${sender.photo}`}
                         className={guide ? classes.Message__authorGuide : ''}
                         alt=""/>
                </Link>
            </div>
            <div className={`${classes.Message__text} ${own ? classes.Message__textOwn : ''} ${text === '[Removed]' ? classes.Message__textRemoved : ''} ${_id.startsWith('optimistic') ? classes.Message__textOwnOptimistic : ''}`}>
                <p>
                    {text}
                </p>
                <div className={`${classes.Message__textOptions} ${text === '[Removed]' ? classes.Message__textOptionsRemoved : ''}`}>
                    <h4>{moment(createdAt).format('HH:MM | DD MMM YYYY')}</h4>
                    {own && text !== '[Removed]' && <button onClick={() => mutate({variables: { id: _id }})} className={classes.Message__textRemove}>
                        <Justicon icon={'trash'} className={classes.Message__textRemoveIcon} />
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Message