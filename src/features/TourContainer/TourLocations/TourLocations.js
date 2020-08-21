import React, { useState} from "react";
import Locations from "./Locations";
import TourMap from "./TourMap";
import 'mapbox-gl/dist/mapbox-gl.css';
import * as d3 from 'd3-ease';

import { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 82)

function TourLocations(props) {
    const ref = React.createRef();
    const executeScroll = () => scrollToRef(ref)
    const {longitude, latitude, zoom} = new WebMercatorViewport({width: 400, height: 400})
        .fitBounds(props.data.locations.map( loc => loc.coordinates), {
            padding: 70,
            offset: [0, -70]
        });
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude,
        longitude,
        zoom: props.search ? 3 : zoom
        // latitude: props.data.start.coordinates[1],
        // longitude: props.data.start.coordinates[0],
        // zoom: 6
    });

    const viewportHandler = (latitude, longitude) => {
        setViewport(p => ({
            ...p,
            latitude,
            longitude,
            transitionDuration: 1600,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3.easeCubic
        }))
        executeScroll()
    }
    const nextViewportHandler = (prev) => {
        setViewport(prev)
    }
    return (
            <div>
                {!props.search && (
                    <Locations
                        viewportHandler={viewportHandler}
                        data={props.data} />
                )}
                <TourMap
                    search={props.search}
                    ref={ref}
                    viewport={viewport}
                    nextViewportHandler={nextViewportHandler}
                    data={props.data}/>
            </div>
    );
}

export default TourLocations