import React from "react";
import classes from './LocationsVisualizer.module.css';

export default function LocationsVisualizer({locations}) {
    return (
        <div className={classes.locs}>
            {locations.map(loc => {
                        const locName = loc.address && loc.address.split(',')[0]
                        return (
                            <div key={loc.coordinates.toString()}><div className={classes.locAnim}>
                                <p className={classes.locVisible}>
                                    {locName && locName.split(' ')[0]}
                                </p>
                                <a href={`https://www.google.com/maps/place/${loc.coordinates.slice().reverse()}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={classes.locInvisible}>
                                    {loc.address}
                                </a>
                            </div></div>
                        )
                    }
                )
            }
        </div>
    )
}
