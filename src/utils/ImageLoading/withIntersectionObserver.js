import React, { useEffect, useState } from "react";
import { registerScrollArea } from "./intersection";

export default function withIntersectionObserver(Component) {
    const subscriber = registerScrollArea();

    return function(props) {
        const [ state, setState ] = useState({ intersecting: null })
        let _mounted = false;
        let _wrapper = null;

        useEffect(() => {
            _mounted = true;
            subscriber(_wrapper)
                .subscribe(intersecting =>
                    _mounted && setState({ intersecting })
                );
            return () => {
                _mounted = false
            }
        }, [])

            return (
                <div className="progressive-loading-wrapper" ref={wrapper => _wrapper = wrapper}>
                    <Component intersecting={state.intersecting} {...props} />
                </div>
            );
        }
}
