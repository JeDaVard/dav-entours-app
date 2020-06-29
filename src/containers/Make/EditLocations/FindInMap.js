import React, { useRef, useState} from "react";
import { connect } from "react-redux";
import classes from "./FindInMap.module.css";
import useMap from "../../../hooks/useMap";
import {newViewport} from "../../../app/actions";
import useDebounce from "../../../hooks/useDebounce";
import Justicon from "../../../components/UI/Justicon";
import {selectedLocation} from "../../../app/actions/searchLocation/actions";

function FindInMap({viewport, newViewport, selectedLocation, closeSearch}) {
    const [ currLocation, setCurrLocation ] = useState(null)
    const mapContainer = useRef(null)
    const mark = useRef(null)

    const updatedViewport = useMap(mapContainer, mark, viewport)
    const { longitude, latitude, zoom } = updatedViewport;

    const fetchCurrLocation = async () => {
        try {
            if (longitude) {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
                const data = await res.json();
                if (data.features[0]) {
                    setCurrLocation({
                        address: data.features[0].place_name,
                        coordinates: data.features[0].geometry.coordinates,
                        description: '',
                        day: 0
                    })
                } else {
                    setCurrLocation(null)
                }
            } else {
                setCurrLocation(null)
            }
        } catch (e) {
            console.log('error')
        }
    }

    useDebounce(_ => {
        fetchCurrLocation();
        newViewport(updatedViewport);
    }, 200, [newViewport, longitude, latitude, zoom])

    return (
        <div>
            <div ref={mapContainer} className={classes.map} />
            <div ref={mark} className={classes.marker} />
            { currLocation && (
                <button
                    style={{cursor: 'pointer'}}
                    onClick={(e) => {
                    selectedLocation(currLocation);
                    closeSearch(e)
                }}>
                    <div className={classes.chosenLocPos}>
                        <div className={classes.chosenLoc}>
                            <div className={classes.pin}>
                                <Justicon icon={'map-pin'} className={classes.pinIcon}/>
                            </div>
                            <div className={classes.chosenLocName}>
                                {currLocation.address}
                            </div>
                        </div>
                    </div>
                </button>
            )}
        </div>
    )
}

const mSTP = s => ({
    viewport: s.searchLocation.viewport
})

const mDTP = d => ({
    newViewport: viewport => d(newViewport(viewport)),
    selectedLocation: (geoObj) => d(selectedLocation(geoObj))
})

export default connect(mSTP, mDTP)(FindInMap)