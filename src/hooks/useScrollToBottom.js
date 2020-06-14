import React, {useCallback} from "react";
import * as ReactDOM from "react-dom";

export default function useScrollToBottom(ref) {
    const scrollToBottom = useCallback((prevent) => {
        if (prevent || !ref.current) return;

        ref.current.scrollTo(0, ref.current.scrollHeight)

    }, [ref])

    return scrollToBottom
}