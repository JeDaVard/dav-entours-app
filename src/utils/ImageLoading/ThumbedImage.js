
import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        const bufferHandler = () => {if (!state.ready) setstate({ ready: true })}
        let buffer;

        if (!state.ready) {
            buffer = new Image();
            buffer.src = theSrc;
            buffer.addEventListener('load', bufferHandler)
        }
        return () => buffer.removeEventListener('load', bufferHandler)
    }, [])

    const { ready } = state;
    
    return (
        <div className={classes.ThumbedImage}>
            <img className={`${props.className} ${classes.ThumbedImage__original}`}
                 src={ready ? theSrc : ''}
                 alt={props.alt} />
            <img
                className={`${props.className} ${ready && classes.ThumbedImage__hide}`}
                src={theThumb}
                alt={props.alt} />
            <div className={ready ? classes.ThumbedImage__unBlur : classes.ThumbedImage__blur } />
        </div>
    )

}
//
// function LazyImage(props) {
//     return (
//         <>
//             {props.ready &&
//             <img className={`${props.className} ${classes.ThumbedImage__original}`}
//                  src={props.src}
//                  alt={props.alt} />}
//         </>
//     )
// }

export default ThumbedImage;
