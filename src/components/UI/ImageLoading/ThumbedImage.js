import React, {useEffect, useRef, useState} from "react";
import classes from './ThumbedImage.module.css';
import classNames from 'classnames/bind'
const cx = classNames.bind(classes);

const ThumbedImage = React.memo(function(props) {
    const { src, XL, alt, className } = props;
    const [ ready, setReady ] = useState(false);

    const theSrc = XL
        ? `${process.env.REACT_APP_CDN}/${src.slice(0, src.length-4)}.large.jpg`
        : `${process.env.REACT_APP_CDN}/${src}`;

    const theThumb = `${process.env.REACT_APP_CDN}/${src.slice(0, src.length-4)}.thumb.jpg`;
    const ref = useRef(null);

    // let _mounted = false;
    //
    // useEffect(() => {
    //     _mounted = true;
    //     return () => {
    //         _mounted = false
    //     }
    // });

    useEffect(() => {
        let buffer;

        const bufferHandler = () => {
            if (!ready) setReady(true)
            ref.current.insertBefore(buffer, ref.current.firstChild)
        }
        if (!ready) {
            buffer = new Image();
            buffer.src = theSrc;
            buffer.className = `${className} ${classes.original}`;
            buffer.alt = alt;
            buffer.addEventListener('load', bufferHandler)
        }
        return () => buffer.removeEventListener('load', bufferHandler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alt, className, theSrc])

    return (
        <div className={classes.ThumbedImage} ref={ref}>
            <img
                src={theThumb}
                className={cx(classes.thumb, className, {[classes.hide]: ready})}
                alt={alt} />
            <div className={cx(classes.blur, {[classes.unBlur]: ready})} />
        </div>
    )
})

export default ThumbedImage;
