import React, {useCallback, useEffect, useRef, useState} from "react";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import classes from "./Messages.module.css";
import useScrollToBottom from "../../../hooks/useScrollToBottom";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";

function Messages(props) {
    const { guides, data, subscribeToMessages, onLoadMore } = props;
    const selfRef = useRef(null);
    const [ fetched, setFetched ] = useState({
        loading: false,
        preventScroll: false
    })

    const [ page, setPage ] = useState(1)

    const handleScroll = useCallback(() => {
        if (selfRef.current.scrollTop === 0) {
            setPage(page + 1)
        }
    }, [selfRef, page]);
console.log('re')
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
        setFetched({
            loading: true,
            preventScroll: true
        })
        onLoadMore(page).then(a => {
            setFetched({
                loading: false,
                preventScroll: false
            })
            selfRef.current.scrollTop = 1
        })

    }, [page])

    useEffect(() => {
        scrollToBottom(fetched.preventScroll);
    }, [data, scrollToBottom]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe()
    },[]);

    return (
        <div className={classes.main} ref={selfRef}>
            <div className={classes.headRelative} />
            <div className="row">
                {fetched.loading && <DotLoading />}
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