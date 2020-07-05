import React, {useEffect, useRef, useState} from "react";
import classes from './SmoothImage.module.css';

const SmoothImage = React.memo(function(props) {
    const { src, className, alt} = props;
    const ref = useRef(null);
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        let buffer;

        const bufferHandler = () => {
            if (!ready) setReady(true)
            ref.current.insertBefore(buffer, ref.current.firstChild)
        }
        if (!ready) {
            buffer = new Image();
            buffer.src = src;
            buffer.className = `${className} ${classes.ready}`;
            buffer.alt = alt;
            buffer.addEventListener('load', bufferHandler)
        }
        return () => buffer.removeEventListener('load', bufferHandler)
    }, [])

    return <div className={classes.container} ref={ref} />
})

export default SmoothImage;