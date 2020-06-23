import React, {useState} from "react";
import classes from "./SearchPopUp.module.css";
import Justicon from "../../../components/UI/Justicon";
import 'mapbox-gl/dist/mapbox-gl.css';
import FindInMap from "./FindInMap";
import OutsideAlerter from "../../../hocs/EventDelegator";

export default function SearchPopUp(props) {
console.log('rend SearchPopUp')
    // const [ hideSuggestions, setHideSuggestions ] = useState(false);
    // const closeSuggestions = () => {
    //     setHideSuggestions(true)
    // }

    return (
        <>
            <div className={classes.searchPage}>
                <div className={classes.absoluteMap}>
                    <FindInMap />
                </div>
                {/*<OutsideAlerter delegate={closeSuggestions}>*/}
                {props.suggestions.length ? (
                        <div className={classes.locDrop}>
                            <div className={classes.searchPlaceholder}/>
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
                    : null}
                {/*</OutsideAlerter>*/}
            </div>
        </>
    )
}