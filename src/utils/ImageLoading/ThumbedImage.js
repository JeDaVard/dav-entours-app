import React, { useEffect, useState } from "react";
import classes from './ThumbedImage.module.css';


const ThumbedImage = function(props) {
    const [ state, setstate ] = useState({ ready: false });
    let _mounted = false;

    useEffect(() => {
        _mounted = true;
        return () => {
            _mounted = false
        }
    });

    if (!state.ready) {
        const buffer = new Image();
        buffer.onload = () => _mounted && setstate({ ready: true });
        buffer.src = props.src;
    }

        const { src, thumb } = props;
        const { ready } = state;

        return (
            <div className={classes.ThumbedImage}>
                <img className={`${props.className} ${classes.ThumbedImage__original}`} src={src} alt={props.alt} />
                <img className={`${props.className} ${ready && classes.ThumbedImage__hide}`} src={thumb} alt={props.alt} />
                <div className={ready ? classes.ThumbedImage__unBlur : classes.ThumbedImage__blur } />
            </div>
        )

}

export default ThumbedImage;
