import React, {useCallback, useEffect, useRef, useState} from "react";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import classes from "./Messages.module.css";
import useScrollToBottom from "../../../hooks/useScrollToBottom";

function Messages(props) {
    const { guides, data, subscribeToMessages, onLoadMore } = props;
    const selfRef = useRef(null);

    const [ page, setPage ] = useState(1)

    const handleScroll = useCallback(() => {
        if (selfRef.current.scrollTop === 0) {
            setPage(page + 1)
        }
    }, [selfRef, page]);

    const scrollToBottom = useScrollToBottom(selfRef);

    useEffect(() => {
        const elem = selfRef.current;

        if (!elem) return

        elem.addEventListener('scroll', handleScroll);

        return () => {
            elem.removeEventListener('scroll', handleScroll);
        };
    }, [selfRef, handleScroll]);

    useEffect(() => {
        onLoadMore(page)
    }, [page, onLoadMore])

    useEffect(() => {
        scrollToBottom();
    }, [data, scrollToBottom]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe()
    },[]);

    return (
        <div className={classes.main} ref={selfRef}>
            <div className={classes.headRelative} />
            <div className="row">
            {data[0] ? data.sort((a, b) => a.createdAt - b.createdAt).map(message => (
                    <Message
                        key={message._id}
                        data={message}
                        guide={guides.find(p => p._id === message.sender._id)}
                        own={message.sender._id === getCookie('userId')}
                    />
            )) : <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '.7rem', color: '#8d8d8d'}}>The conversation has no messages yet. Let's start.</p>}
            </div>
            <div className={classes.inputPlaceHolder}/>
        </div>
    )
}

export default Messages