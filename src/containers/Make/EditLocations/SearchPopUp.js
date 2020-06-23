import React, {useState} from "react";
import classes from "./SearchPopUp.module.css";
import Justicon from "../../../components/UI/Justicon";
import 'mapbox-gl/dist/mapbox-gl.css';
import FindInMap from "./FindInMap";

export default function SearchPopUp(props) {
console.log('rend SearchPopUp')
    return (
        <div className={classes.searchPage}>
            <div className={classes.searchPlaceholder}/>
            {
                props.suggestions.length ? (
                        <div className={classes.locDrop}>
                            {props.suggestions.map(loc => (
                                <button
                                    key={loc.geometry.coordinates[0].toString()+loc.place_name.slice(0.10)}
                                    onClick={(e) => props.onCurrentPosition(e, {coordinates: loc.geometry.coordinates, address: loc.place_name})}
                                    className={classes.searchResultButton}
                                >
                                    <div className={classes.pin}>
                                        <Justicon icon={'map-pin'} className={classes.pinIcon}/>
                                    </div>
                                    <p className={classes.locName}>
                                        {loc.place_name}
                                    </p>
                                </button>
                            ))}
                        </div>)
                    : null

            }
            <div>{props.currentPosition.address}</div>
            <div>{props.currentPosition.coordinates}</div>

            <div className={classes.absoluteMap}>
                <FindInMap />
            </div>
        </div>
    )
}