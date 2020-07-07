import React from "react";
import classes from './Message.module.css';
import moment from "moment";
import { Link } from "react-router-dom";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_MESSAGE } from "../Conversation/queries";
import classNames from 'classnames/bind'
import SmoothImage from "../../../components/UI/ImageLoading/SmoothImage";
let cx = classNames.bind(classes);

function Message({data: {text, createdAt, sender, _id, isImage, convId }, own, guide}) {
    const isRemoved = text === '[Removed]'
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
        <div className={classes.photoFrame}>
             <SmoothImage
                 src={text.startsWith('http') ? text : `${process.env.REACT_APP_CDN}/${text}`}
                 alt="tour moment"
                 className={classes.photo}
             />
        </div>
    );

    return (
        <div className={cx(classes.Message, {[classes.own]:own})}>
            <div className={`${classes.author} ${own ? classes.authorOwn  : ''}`}>
                <Link to={`/user/${sender._id}`}>
                    <img src={`${process.env.REACT_APP_SERVER}/images/user/${sender.photo}`}
                         className={guide ? classes.authorGuide : ''}
                         alt=""/>
                </Link>
            </div>
            <div className={cx(classes.text, {
                    [classes.textOwn]:own,
                    [classes.image]: !isRemoved && isImage,
                    [classes.textOwnOptimistic]:_id.startsWith('optimistic'),
                    [classes.textRemoved]:isRemoved,
            }
                )}>

                {(isImage && text !== '[Removed]') ? image : <p>{text}</p>}

                <div className={cx(classes.textOptions, {
                    [classes.imageOptions]: !isRemoved && isImage,
                    [classes.textOptionsRemoved]:isRemoved,
                })}>
                    <h4>{moment(createdAt).format('HH:MM | DD MMM YYYY')}</h4>
                    {own && !isRemoved && <button onClick={() => mutate({
                        variables: {
                            id: _id,
                            key: text.startsWith('users/') && isImage ? text : null
                        }
                    })}
                                                  className={classes.textRemove}>
                        <Justicon icon={'trash'}
                                  className={classes.textRemoveIcon} />
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Message