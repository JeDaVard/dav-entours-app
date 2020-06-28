
import React, { useState } from "react";
import classes from './ThumbedImage.module.css';


const ThumbedImage = function(props) {
    const { src, XL, alt } = props;
    const [ state, setstate ] = useState({ ready: false });

    const theSrc = XL
        ? `${process.env.REACT_APP_CDN}/${src.slice(0, src.length-4)}.large.jpg`
        : `${process.env.REACT_APP_CDN}/${src}`;

    const theThumb = `${process.env.REACT_APP_CDN}/${src.slice(0, src.length-4)}.thumb.jpg`;
    // let _mounted = false;
    //
    // useEffect(() => {
    //     _mounted = true;
    //     return () => {
    //         _mounted = false
    //     }
    // });

    if (!state.ready) {
        const buffer = new Image();
        buffer.onload = () => !state.ready && setstate({ ready: true });
        buffer.src = theSrc;
    }

    const { ready } = state;

    return (
        <div className={classes.ThumbedImage}>
            <img className={`${props.className} ${classes.ThumbedImage__original}`}
                 src={theSrc}
                 alt={alt} />
            <img
                className={`${props.className} ${ready && classes.ThumbedImage__hide}`}
                src={theThumb}
                alt={props.alt} />
            <div className={ready ? classes.ThumbedImage__unBlur : classes.ThumbedImage__blur } />
        </div>
    )

}

export default ThumbedImage;
