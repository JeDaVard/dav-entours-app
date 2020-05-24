import React, { useEffect, useState } from "react";
import withIntersectionObserver from "./withIntersectionObserver"
import classNames from "classnames";


const ProgressiveImageLoading = React.memo(function(props) {
    const [ state, setstate ] = useState({ ready: false });
    let _triggered = false;
    let _mounted = false;

    useEffect(() => {
        _mounted = true;
        return () => {
            _mounted = false
        }
    }, [props.intersecting]);

    if (props.intersecting && !_triggered) {
        _triggered = true;
        const buffer = new Image();
        buffer.onload = () => _mounted && setstate({ ready: true });
        buffer.src = props.src;
    }


        const { src, thumb, blur } = props;
        const { ready } = state;

        return (
            <div className="progressive-loading-wrapper">
                <img className={`${props.className} original`} src={src} alt={props.alt} />
                <img className={classNames(`${props.className} thumb`, { blur, hide: ready })} src={thumb} alt={props.alt} />
                <div className={ready ? `backblur2` : `backblur`} />
            </div>
        )

})

export default withIntersectionObserver(ProgressiveImageLoading);
