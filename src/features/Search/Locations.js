import React from "react";
import classes from "./Locations.module.css";
import { Link } from "react-router-dom";
import Justicon from "../../components/UI/JustIcon/Justicon";

export default function Locations(props) {
    const { locations } = props;

    return (
        <div className={classes.locationBlock}>
            {locations.map(loc => (
                <Link to={'/'}
                      key={loc.geometry.coordinates[0].toString()+loc.place_name.slice(0.10)}
                      className={classes.locationLink}>
                    <div className={classes.location}>
                        <div className={classes.iconFrame}>
                            <Justicon icon="map-pin" className={classes.icon}/>
                        </div>
                        <div className={classes.title}>
                            <h1>{loc.place_name.split(',')[0]}</h1>
                            <p>{loc.place_name}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}