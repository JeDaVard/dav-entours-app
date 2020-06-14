import {useCallback} from "react";

export default function useScrollToBottom(ref) {
    return useCallback((prevent) => {
        if (prevent || !ref.current) return;

        ref.current.scrollTo(0, ref.current.scrollHeight)

    }, [ref])
}