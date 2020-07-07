import React, { useEffect, useRef, useState} from "react";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import classes from "./Messages.module.css";
import useScrollToBottom from "../../../hooks/useScrollToBottom";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";
import InfiniteScroll from 'react-infinite-scroller';



function Messages(props) {
    const { hasMore, guides, data, subscribeToMessages, onLoadMore, convId } = props;

    const selfRef = useRef(null);

    const [ preventScroll, setPreventScroll ] = useState(false)

    const scrollToBottom = useScrollToBottom(selfRef);

    const fetchMore = async () => {
        setPreventScroll(true);
        await onLoadMore()
        setPreventScroll(false);
    }

    useEffect(() => {
        scrollToBottom(preventScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, scrollToBottom]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className={classes.main} ref={selfRef}>
            <div className={classes.headRelative} />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchMore}
                    hasMore={hasMore}
                    useWindow={false}
                    isReverse={true}
                    initialLoad={false}
                    threshold={1}
                    getScrollParent={() => selfRef.current}
                >
                     <div className="row">
                         <div style={{marginTop: '1rem'}}>
                             {preventScroll && <DotLoading />}
                         </div>
                         {!hasMore && data.length > 12 && <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '1.2rem', color: '#8d8d8d'}}>The start of the conversation</p>}
                         {data[0] ? data.sort((a, b) => a.createdAt - b.createdAt).map(message => (
                             <Message
                                 convId={convId}
                                 key={message._id}
                                 data={message}
                                 guide={guides.find(p => p._id === message.sender._id)}
                                 own={message.sender._id === getCookie('userId')}
                             />
                         )) : <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '.7rem', color: '#8d8d8d'}}>The conversation has no messages yet. Let's start.</p>}
                     </div>
                </InfiniteScroll>
            <div className={classes.inputPlaceHolder}/>
        </div>
    )
}

export default Messages