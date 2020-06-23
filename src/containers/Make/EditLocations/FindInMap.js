import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import classes from "./FindInMap.module.css";
import useMap from "../../../hooks/useMap";
import {newViewport} from "../../../app/actions";
import { simpleDebounce } from "../../../utils/debounce";
import useDebounce from "../../../hooks/useDebounce";

function FindInMap({viewport, newViewport}) {
    const mapContainer = useRef(null)
    const mark = useRef(null)

    const updatedViewport = useMap(mapContainer, mark, viewport)
    const { longitude, latitude, zoom } = updatedViewport;

    useDebounce(_ => {
        newViewport(updatedViewport);
    }, 200, [newViewport, longitude, latitude, zoom])

    return (
        <div>
            <div className={classes.choosedLoc}>
                <div>Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}</div>
            </div>
            <div ref={mapContainer} className={classes.map} />
            <div ref={mark} className={classes.marker} />
        </div>
    )
}

const mSTP = s => ({
    viewport: s.searchLocation.viewport
})

const mDTP = d => ({
    newViewport: viewport => d(newViewport(viewport))
})

export default connect(mSTP, mDTP)(FindInMap)