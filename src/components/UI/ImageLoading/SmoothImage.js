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
            buffer.src = src.startsWith('http') ? src : process.env.REACT_APP_CDN+'/'+src;
            buffer.className = `${className} ${classes.ready}`;
            buffer.alt = alt;
            buffer.addEventListener('load', bufferHandler)
        }
        return () => buffer.removeEventListener('load', bufferHandler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alt, className, src])

    return <div className={classes.container} ref={ref} />
})

export default SmoothImage;