import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = ({ ref, hasMore, onLoadMore, page }) => {
    const [isFetching, setIsFetching] = useState(false);
    const handleScroll = useCallback(() => {
        if (ref.current.scrollTop === 0 && isFetching === false && hasMore) {
            // starts to fetch if scrolled to top, fetching is not in progress and has more data
            setIsFetching(true);
        }
    }, [ref, isFetching, hasMore]);

    useEffect(() => {
        const elem = ref.current;

        if (!elem) return

        elem.addEventListener('scroll', handleScroll);

        return () => {
            elem.removeEventListener('scroll', handleScroll);
        };
    }, [ref, handleScroll]);

    // loads more if fetching has started
    useEffect(() => {
        if (isFetching) onLoadMore(page);

    }, [isFetching, onLoadMore, page]);

    const stopFetching = useCallback(() => {
        setIsFetching(false);
    }, []);

    return [isFetching, stopFetching];
};

export default useInfiniteScroll;
