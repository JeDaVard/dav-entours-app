import {useEffect, useState} from "react";

const defaultOptions = {
    changePoint: 0
}

export default function useScrollTrigger({ changePoint } = defaultOptions) {
    const [ scroll, setScroll ] = useState({
        triggered: window.scrollY > changePoint
    });

    const handleScroll = () => {
        if (window.scrollY > changePoint && !scroll.triggered) {
            setScroll(state => ({
                ...state,
                triggered: true
            }))
        } else if (window.scrollY <= changePoint && scroll.triggered) {
            setScroll(state => ({
                ...state,
                triggered: false
            }))
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return [scroll.triggered, setScroll]
}