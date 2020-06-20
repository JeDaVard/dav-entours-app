import React, {Component, useEffect, useRef, useState} from "react";
import classes from './Make.module.css';
import t from './1-1.jpg'
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";
import Input from "../../components/UI/Input/Input";
// import "mapbox-gl/dist/mapbox-gl.css"
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"

import MapGL, { Marker } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";


const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class SearchableMap extends Component {
    state = {
        viewport :{
            latitude: 0,
            longitude: 0,
            zoom: 2
        },
        searchResultLayer: null
    }

    mapRef = React.createRef()

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    }
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    handleOnResult = event => {
        this.setState({
            searchResultLayer: new GeoJsonLayer({
                id: "search-result",
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            })
        })
    }

    render(){
        console.log(this.state.viewport.latitude)
        const { viewport, searchResultLayer} = this.state
        return (
            <div style={{ height: '100vh'}}>
                <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location or click <a href="/">here</a> to find your location</h1>
                <MapGL
                    ref={this.mapRef}
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    width="100%"
                    height="90%"
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken={token}
                >
                    <Geocoder
                        mapRef={this.mapRef}
                        onResult={this.handleOnResult}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={token}
                        position='top-left'
                    />

                    {/*<input/>*/}
                </MapGL>

                <DeckGL {...viewport} layers={[searchResultLayer]} />
            </div>
        )
    }
}


function Make() {
    const [ input, setInput ] = useState({
        title: '',
        difficulty: 'easy',
        maxSize: 2,
    })

    const inputHandler = (e) => {
        const target = e.target;

        setInput(p => ({
            ...p,
            [target.name]: target.value
        }))
    }

    return (
        <div className={classes.make}>
            <div className={classes.imageFrame}>
                <img src={t} className={classes.image} alt="tour demo"/>
                <div className={classes.title}>
                    <div className="row">
                        <h1>Earn money as a tour maker</h1>
                    </div>
                </div>
            </div>
            <div className={classes.makeWindow}>
                <h1 className={classes.mobileTitle}>Earn money as a tour maker</h1>
                <div className={classes.separator}>
                    <Separator color={'light'} margin={'1 2'}/>
                </div>
                    <form action="" className={classes.makeForm}>
                        <Input type="text" name="title" placeholder="Tour Title" onChange={inputHandler}/>
                        <Input name={'difficulty'} value={input.difficulty} onChange={inputHandler} options={[{value: 'easy', name: 'Difficulty level: Easy'}, {value: 'hard', name: 'Difficulty level: Hard'}]}/>
                        <Input name={'maxSize'} value={input.maxSize} onChange={inputHandler} options={[{value: 1, name: 'Group Size: 1'}, {value: 2, name: 'Group Size: 2'}]}/>

                        <StyledButton type={'submit'}>Get Started &#8594;</StyledButton>
                    </form>
            </div>
            <div>
            <div style={{width: '100%', height: '40rem', position: 'relative'}}>
                <SearchableMap />
            </div>
            </div>
        </div>
    )
}

export default Make