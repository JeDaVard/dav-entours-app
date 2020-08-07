import React from "react";
import classes from './TourMap.module.css'
import ReactMapGL, {Marker, NavigationControl, Popup } from "react-map-gl";

const TourMap =  React.forwardRef((props, ref) => {
    const { viewport, nextViewportHandler, search } = props;
    return (
        <div className={search ? classes.mapFrameSearch : classes.mapFrame} ref={ref}>
            <ReactMapGL
                {...viewport}
                scrollZoom={false}
                width="100%"
                height="100%"
                mapStyle={process.env.REACT_APP_MAP}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => nextViewportHandler(nextViewport)}
            >
                <div style={{position: 'absolute', right: '5%', top: '2rem'}}>
                    <NavigationControl
                        // showZoom={true}
                        showCompass={false}
                        captureScroll={true}
                    />
                </div>
                {props.data.locations.map((loc, index) => (
                    <div
                        key={loc.description}
                    >
                        <Marker
                            latitude={loc.coordinates[1]}
                            longitude={loc.coordinates[0]}
                            offsetLeft={-15}
                            offsetTop={-15}
                        >
                            <div className={classes.marker} />
                        </Marker>
                            <Popup
                                sortByDepth={true}
                                closeButton={false}
                                latitude={loc.coordinates[1]}
                                longitude={loc.coordinates[0]}
                                dynamicPosition={false}
                                anchor="bottom" >
                                <a
                                    href={`https://www.google.com/maps/place/${loc.coordinates[1]},${loc.coordinates[0]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.popUpLink}
                                >
                                    <div className={classes.popUp}><b>{index+1}</b>&nbsp;-&nbsp;{loc.description}&nbsp;({loc.day} days)</div>
                                </a>
                            </Popup>
                    </div>
                ))}
            </ReactMapGL>
        </div>
    )
})

export default TourMap