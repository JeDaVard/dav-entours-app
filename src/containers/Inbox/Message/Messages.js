import React, {useEffect, useRef, useState} from "react";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import classes from "./Messages.module.css";
import useScrollToBottom from "../../../hooks/useScrollToBottom";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function Messages(props) {
    const { convId, guides, data, subscribeToNewComments } = props;
    const selfRef = useRef(null);

    const [ page, setPage ] = useState(1)

    const [fetching, stopFetching] = useInfiniteScroll({
        onLoadMore: props.onLoadMore,
        page,
        hasMore: true,
        ref: selfRef,
        setPage,
});

    const scrollToBottom = useScrollToBottom(selfRef);

    useEffect(() => {
        if (fetching) {
            stopFetching()
        }
    }, [])

    useEffect(() => {
        props.onLoadMore(page)
    }, [page])

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    useEffect(() => {
        const unsubscribe = subscribeToNewComments();
        return () => unsubscribe()
    },[]);

    const loadMore = () => {
        setPage(page + 1)
    }
    console.log('rerendered', page)

    return (
        <div className={classes.main} ref={selfRef}>
            <div className={classes.headRelative} />
            <button onClick={loadMore}>fetch more</button>
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