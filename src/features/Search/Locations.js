import React from 'react';
import classes from './Locations.module.css';
import Justicon from '../../components/UI/JustIcon/Justicon';

export default function Locations(props) {
    const { locations, onSearch } = props;

    return (
        <div className={classes.locationBlock}>
            {locations.map((loc) => {
                const locArr = loc.place_name.split(',');
                return (
                    <button onClick={e => onSearch(e, {
                        place_name: loc.place_name,
                        geometry: {
                            coordinates: loc.geometry.coordinates
                        }
                    })}
                        key={
                            loc.geometry.coordinates.toString() +
                            loc.place_name.toString()
                        }
                        className={classes.locationLink}
                    >
                        <div className={classes.location}>
                            <div className={classes.iconFrame}>
                                <Justicon icon="map-pin" className={classes.icon} />
                            </div>
                            <div className={classes.title}>
                                <h1>{locArr[0].length > 40 ? locArr[0].split(' ').slice(0, 3).join(' ') : locArr[0] }</h1>
                                <p>{locArr.slice(-3).join(', ')}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    );
}
