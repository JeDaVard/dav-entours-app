import React, {useEffect, useRef, useState} from "react";
import classes from './TourMap.module.css';
// import mapboxgl from "mapbox-gl";
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function TourMap(props) {
    console.log(props.data.locations)
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: props.data.start.coordinates[1],
        longitude: props.data.start.coordinates[0],
        zoom: 6
    });

    const viewPortHandler = (latitude, longitude) => {
        setViewport(p => ({
            ...p,
            latitude,
            longitude
        }))
    }
    return (
        <div className={classes.mapFrame}>
            <div className={classes.locList}>
                <div className="row">
                        {props.data.locations.map(loc => (
                            <button onClick={() => viewPortHandler(loc.coordinates[1], loc.coordinates[0])}>
                                {loc.description}
                            </button>
                        ))}
                </div>
            </div>
            <div className={'marker'} />
            <ReactMapGL
                {...viewport}
                scrollZoom={false}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/jedavard/ck95ei4j42c421ip7jwoh6p73"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
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
                        onClick={() => viewPortHandler(loc.coordinates[1], loc.coordinates[0])}
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
                            closeButton={false}
                            latitude={loc.coordinates[1]}
                            longitude={loc.coordinates[0]}
                            anchor="bottom" >
                            <div className={classes.popUp}>{index+1})&nbsp;{loc.description}&nbsp;({loc.day} days)</div>
                        </Popup>
                    </div>
                ))}
            </ReactMapGL>
        </div>
    );
}

// function TourMap(props) {
//     console.log(props)
//     const mapRef = useRef(null);
//     const pinRef = useRef(null);
//
//     const [ state, setState ] = useState({
//         lng: 5,
//         lat: 34,
//         zoom: 1.5
//     })
//
//     const { lng, lat, zoom } = state;
//
//     useEffect(() => {
//
//         const map = new mapboxgl.Map({
//             container: mapRef.current,
//             style: 'mapbox://styles/jedavard/ck95ei4j42c421ip7jwoh6p73',
//             center: [lng, lat],
//             zoom
//         });
// // const el = <div className="marker" ref={this.pinRef}/>;
//         new mapboxgl.Marker({
//             element: pinRef.current,
//             anchor: 'bottom'
//         })
//             .setLngLat(props.data[0].coordinates)
//             .addTo(map);
//
//         map.on('move', () => {
//             const { lng, lat } = map.getCenter();
//
//             setState({
//                 lng: lng.toFixed(4),
//                 lat: lat.toFixed(4),
//                 zoom: map.getZoom().toFixed(2)
//             });
//         });
//     }, [props.data])
//
//     return (
//         <div className={classes.mapFrame}>
//             <div className='sidebarStyle'>
//                 <div className="marker" ref={pinRef}/>
//             </div>
//             {/*{this.state.geoJson.features.map(loc => {*/}
//             {/*    return <div className="marker" />*/}
//             {/*})}*/}
//             <div ref={mapRef} className='mapContainer'>
//             </div>
//         </div>
//     )
// }

export default TourMap