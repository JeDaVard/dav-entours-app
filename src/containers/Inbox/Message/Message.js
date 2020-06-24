import React from "react";
import classes from './Message.module.css';
import moment from "moment";
import { Link } from "react-router-dom";
import Justicon from "../../../components/UI/Justicon";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_MESSAGE } from "../Conversation/queries";
import classNames from 'classnames/bind'
let cx = classNames.bind(classes);

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
        <div className={cx(classes.Message, {[classes.Message__own]:own})}>
            <div className={`${classes.Message__author} ${own ? classes.Message__authorOwn  : ''}`}>
                <Link to={`/user/${sender._id}`}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${sender.photo}`}
                         className={guide ? classes.Message__authorGuide : ''}
                         alt=""/>
                </Link>
            </div>
            <div className={cx(classes.Message__text, {
                    [classes.Message__textOwn]:own,
                    [classes.Message__textRemoved]:text === '[Removed]',
                    [classes.Message__textOwnOptimistic]:_id.startsWith('optimistic')}
                )}>

                {isImage && text !== '[Removed]' ? image : <p>{text}</p>}

                <div className={cx(classes.Message__textOptions, {[classes.Message__textOptionsRemoved]:text === '[Removed]' })}>
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