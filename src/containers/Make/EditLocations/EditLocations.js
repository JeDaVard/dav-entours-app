import React, {useEffect, useRef, useState} from "react";
import classes from './EditLocations.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import {Form, Input, MultiInput, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import SearchLocationInput from "./SearchLocationInput";
import { connect } from "react-redux";


function EditLocations(props) {
    const { newLocation } = props
    const [ locations, setLocations ] = useState([...props.locations]);

    useEffect(() => {
        if (newLocation.coordinates) {
            setLocations([...locations, newLocation])
        }
    }, [newLocation])

    const onInputChange = (e, address) => {
        const name = e.target.name,
            value = e.target.value;

        const index = locations.findIndex(loc => loc.address === address);
        const newState = [...locations]
        newState[index][name] = name === 'day' ? +value : value;

        setLocations(newState)
    }
    console.log(locations)
    return (
        <div className="row">
            <SearchLocationInput />
            {/*{ loading && <TopLoading />}*/}
            <div className={classes.main}>
                <Form>
                    {locations.map(loc => (
                        <div className={classes.locationBox} key={loc.coordinates[0]+loc.coordinates[1]}>
                            <div className={classes.addressBox}>
                                <MultiInput>
                                    <Input
                                        id={`address${loc.coordinates[0]+loc.coordinates[1]}`}
                                        type="text"
                                        name="address"
                                        value={loc.address}
                                        onChange={e => onInputChange(e, loc.address)}
                                    />
                                    <Input
                                        type="number"
                                        name="day"
                                        id={`day${loc.coordinates[0]+loc.coordinates[1]}`}
                                        value={loc.day}
                                        onChange={e => onInputChange(e, loc.address)}/>
                                </MultiInput>
                            </div>
                            <div className={classes.description}>
                                <Textarea
                                    maxLength={400}
                                    onChange={e => onInputChange(e, loc.address)}
                                    id={`description${loc.coordinates[0]+loc.coordinates[1]}`}
                                    label="Description"
                                    name="description"
                                    value={loc.description}
                                    rows={'4'}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </Form>
            </div>
        </div>
    )
}

const mSTP = s => ({
    newLocation: s.searchLocation.selLoc
})
const mDTP = d => ({

})

export default connect(mSTP, mDTP)(EditLocations)