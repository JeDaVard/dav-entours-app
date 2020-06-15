import React, {useCallback, useEffect, useRef, useState} from "react";
import Message from "./Message";
import { getCookie } from "../../../utils/cookies";
import classes from "./Messages.module.css";
import useScrollToBottom from "../../../hooks/useScrollToBottom";
import DotLoading from "../../../components/UI/DotLoading/DotLoading";
import InfiniteScroll from 'react-infinite-scroller';



function Messages(props) {
    const { guides, data, subscribeToMessages, onLoadMore } = props;
    const selfRef = useRef(null);
    const [ fetch, setFetch ] = useState({
        page: 1,
        preventScroll: false,
        canFetch: true,
        fetching: false
    })

    const [ page, setPage ] = useState(2)

    // const handleScroll = useCallback(() => {
    //     if (selfRef.current.scrollTop === 0 && !fetch.fetching) {
    //         setFetch(p => ({
    //             ...p,
    //             fetching: true,
    //             preventScroll: true,
    //         }))
    //     }
    // }, [selfRef, fetch.fetching]);
    //
    // useEffect(() => {
    //     if (fetch.fetching) {
    //         onLoadMore(fetch.page + 1).then(a => {
    //             setFetch(p => ({
    //                 ...p,
    //                 preventScroll: false,
    //                 fetching: false,
    //                 page: p.page + 1
    //             }))
    // // console.log(fetch.page, fetch.fetching, fetch.canFetch, selfRef.current.scrollTop)
    //         }).then(() => {
    //             setTimeout(() => {
    //                 selfRef.current.scrollTop = 1
    //
    //             }, 1000)
    //         })
    //     }
    //
    // }, [fetch.fetching])
    //
    // useEffect(() => {
    //     const elem = selfRef.current;
    //     if (!elem) return
    //
    //     elem.addEventListener('scroll', handleScroll);
    //     return () => elem.removeEventListener('scroll', handleScroll)
    // }, [selfRef, handleScroll]);


    const [ preventScroll, setPreventScroll ] = useState(false)

    const scrollToBottom = useScrollToBottom(selfRef);

    useEffect(() => {
        scrollToBottom(preventScroll);
    }, [data, scrollToBottom]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe()
    },[]);

    return (
        <div className={classes.main} ref={selfRef}>
            <div className={classes.headRelative} />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        setPreventScroll(true);
                        return onLoadMore(page).then(() => {
                            setPage(page+1)
                            setPreventScroll(false);
                        })
                    }}
                    hasMore={page < 3}
                    useWindow={false}
                    isReverse={true}
                    initialLoad={false}
                    threshold={1}
                    getScrollParent={() => selfRef.current}
                >
                     <div className="row">
                         {preventScroll && <DotLoading />}
                         {data[0] ? data.sort((a, b) => a.createdAt - b.createdAt).map(message => (
                             <Message
                                 key={message._id}
                                 data={message}
                                 guide={guides.find(p => p._id === message.sender._id)}
                                 own={message.sender._id === getCookie('userId')}
                             />
                         )) : <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '.7rem', color: '#8d8d8d'}}>The conversation has no messages yet. Let's start.</p>}
                     </div>
                </InfiniteScroll>
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    {fetch.fetching && <DotLoading />}*/}
            {/*{data[0] ? data.sort((a, b) => a.createdAt - b.createdAt).map(message => (*/}
            {/*        <Message*/}
            {/*            key={message._id}*/}
            {/*            data={message}*/}
            {/*            guide={guides.find(p => p._id === message.sender._id)}*/}
            {/*            own={message.sender._id === getCookie('userId')}*/}
            {/*        />*/}
            {/*)) : <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '.7rem', color: '#8d8d8d'}}>The conversation has no messages yet. Let's start.</p>}*/}
            {/*</div>*/}
            <div className={classes.inputPlaceHolder}/>
        </div>
    )
}

export default Messages