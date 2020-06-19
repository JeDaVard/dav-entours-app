import React from "react";
import classes from './Message.module.css';
import moment from "moment";
import {Link} from "react-router-dom";
import Justicon from "../../../components/UI/Justicon";
import {useMutation} from "@apollo/react-hooks";
import { REMOVE_MESSAGE } from "../Conversation/queries";

function Message({data: {text, createdAt, sender, _id, isImage, convId }, own, guide}) {
    const [mutate] = useMutation(REMOVE_MESSAGE, {
            optimisticResponse: {
                removeMessage: {
                    success: true,
                    code: '200',
                    message: 'Removed successfully!',
                    data: {
                        _id,
                        text: '[Removed]',
                        createdAt: createdAt,
                        isImage: false,
                        sender: {
                            _id: sender._id,
                            name: sender.name,
                            photo: sender.photo,
                            __typename: 'User',
                        },
                        __typename: "Message",
                    },
                    __typename: 'MessageMutationResponse'
                },
                __typename: "Mutation",
            },
    });

    const image = (
        <div className={classes.Message__photoFrame}>
            <img src={text.startsWith('http') ? text : `${process.env.REACT_APP_SERVER}/users/${sender._id}/conversations/${convId}/${text}`} alt="tour moment" className={classes.Message__photo}/>
        </div>
    );

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

                {isImage && text !== '[Removed]' ? image : <p>{text}</p>}

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