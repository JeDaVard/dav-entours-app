import React, { useState } from "react";
import Locations from "./Locations";
import TourMap from "./TourMap";
import 'mapbox-gl/dist/mapbox-gl.css';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 82)

function TourLocations(props) {
    const ref = React.createRef();
    const executeScroll = () => scrollToRef(ref)


    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: props.data.start.coordinates[1],
        longitude: props.data.start.coordinates[0],
        zoom: 6
    });

    const viewportHandler = (latitude, longitude) => {
        setViewport(p => ({
            ...p,
            latitude,
            longitude
        }))
        executeScroll()
    }
    const nextViewportHandler = (prev) => {
        setViewport(prev)
    }
    return (
            <div>
                <Locations
                    viewportHandler={viewportHandler}
                    data={props.data} />
                <TourMap
                    ref={ref}
                    viewport={viewport}
                    nextViewportHandler={nextViewportHandler}
                    data={props.data}/>
            </div>
    );
}

export default TourLocations