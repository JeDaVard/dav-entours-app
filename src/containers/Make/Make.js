import React, {Component, useEffect, useRef, useState} from "react";
import classes from './Make.module.css';
import t from './1-1.jpg'
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";
import Input from "../../components/UI/Input/Input";
// import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import MapGL  from "react-map-gl";
// import Geocoder from "react-map-gl-geocoder";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

mapboxgl.accessToken = token;

function Make() {
    const [ input, setInput ] = useState({
        title: '',
        difficulty: 'easy',
        maxSize: 4,
    })

    const maxGroupSizeOptions = []
    for (let i = 1; i <= 20; i++) {
        maxGroupSizeOptions.push({value: i, name: `Group Size: ${i}`})
    }
    const difficultyOptions = [
        {value: 'easy', name: 'Difficulty: Easy'},
        {value: 'medium', name: 'Difficulty: Medium'},
        {value: 'hard', name: 'Difficulty: Hard'}
    ]

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
                        <Input
                            type="text"
                            name="title"
                            placeholder="Tour Name"
                            onChange={inputHandler}/>
                        <Input
                            name={'difficulty'}
                            value={input.difficulty}
                            onChange={inputHandler}
                            options={difficultyOptions}/>
                        <Input
                            name={'maxSize'}
                            value={input.maxSize}
                            onChange={inputHandler}
                            options={maxGroupSizeOptions}/>

                        <StyledButton type={'submit'}>Get Started &#8594;</StyledButton>
                    </form>
            </div>
            <div>
            <div style={{width: '100%', height: '40rem', position: 'relative'}}>
                {/*<SearchableMap />*/}
                <Search />
            </div>
            </div>
        </div>
    )
}

function Search() {
    const [ state, setState ] = useState([]);

    // const theRef = useRef(null)

    // useEffect(() => {
// console.log(theRef.current)
// console.log(document.getElementById('mmap'))
//         var geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             types: 'country,region,place,postcode,locality,neighborhood'
//         });
//         geocoder.addTo(document.getElementById('mmap'))
//     }, )

    const changeHandler = async (e) => {
        const target = e.target
        try {
            if (target.value !== '')
            {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${target.value}.json?access_token=${token}&limit=5`)
                const data = await res.json()
                console.log(data)
                setState(data.features)
            } else {
                setState([])
            }
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <div>
            <input type="text" onChange={changeHandler}/>
            <div>
                {state.map(loc => (
                    <p key={loc.id}>{loc.text}</p>
                ))}
            </div>
        </div>
    )
}

export default Make