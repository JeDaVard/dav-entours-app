import React, {useEffect, useState} from "react";
import classes from './EditLocations.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import {Form, Input, MultiInput, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import SearchLocationInput from "./SearchLocationInput";
import { connect } from "react-redux";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_LOCATIONS} from "../queries";
import {useHistory} from "react-router-dom";
import { selectedLocation, startSearchLoc} from "../../../app/actions/searchLocation/actions";
import Justicon from "../../../components/UI/Justicon";
import {sikTypeNames} from "../../../utils/SiktirTypeName";
import SimpleMobileTop from "../SimpleMobileTop";


function EditLocations(props) {
    const history = useHistory()
    const { selectedLocation, startSearchLoc } = props;
    const newLocation = {...props.newLocation}
    const [ locations, setLocations ] = useState([...props.locations.slice().reverse()]);

    const [ mutateTourLocations, { loading } ] = useMutation(EDIT_TOUR_LOCATIONS, {
        variables: {
            id: props._id,
            locations: sikTypeNames(locations.slice().reverse()),
        }
    })

    useEffect(() => {
        if (newLocation.coordinates.length) {
            setLocations([newLocation, ...locations])
            selectedLocation({
                address: '',
                coordinates: [],
                description: '',
                day: null
            })
        }
    }, [selectedLocation, newLocation])

    const onInputChange = (e, address) => {
        const name = e.target.name,
            value = e.target.value;

        const index = locations.findIndex(loc => loc.address === address);
        const newState = [...locations]
        newState[index][name] = name === 'day' ? +value : value;

        setLocations(newState)
    }
    const removeLocation = (e, address) => {
        e.preventDefault();

        const newState = locations.filter(loc => loc.address !== address);
        setLocations(newState)
    }
    // const changeLocation = (e, viewport) => {
    //     e.preventDefault();
    //
    //     newViewport(viewport)
    //     startSearchLoc()
    // }
    const addLocation = e => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                if (typeof pos.coords.latitude === 'number') {
                    startSearchLoc({
                        longitude: pos.coords.longitude,
                        latitude: pos.coords.latitude,
                        zoom: 12
                    })
                } else {
                    startSearchLoc()
                }
            });
        } else {
            startSearchLoc()
        }
    }
    const onTourLocationSave = e => {
        e.preventDefault();

        mutateTourLocations()
            .then(res => {
                if (props.draft) {
                    history.push(`/tour/${props.slug}/edit/gallery`)
                }
            })
    }

    const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    const submissionUI = props.isMobile ? (
        <SimpleMobileTop
            to={props.draft ? `/mytours?tab=draft` : `/mytours`}
            button={props.draft ? 'Next' : 'Save'}
            type={'disabled'}
            disabled={!locations.length}
            icon={props.draft ? 'chevron-right' : 'check'}
            children={'Locations'}
            loading={loading}
            top
            shadow
            fixed
        />
    ) : (
        <div className={classes.button}>
            <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
        </div>
    );

    return (
        <>

        <div className="row">
            <SearchLocationInput />
            { loading && <TopLoading />}
            <div className={classes.main}>
                <StyledButton onClick={addLocation}>Add New Location</StyledButton>
                <Form onSubmit={onTourLocationSave}>
                    {locations.map(loc => (
                        <div className={classes.locationBox} key={loc.coordinates[0]+loc.coordinates[1]}>
                            <div className={classes.addressBox}>
                                <div className={classes.controlsBox}>
                                    <div className={classes.coordinatesBox}>
                                        <Justicon icon={'check'} className={classes.checkIcon}/>
                                        <p className={classes.coordinates}>Location tied: {loc.coordinates.join(' ')}</p>
                                    </div>
                                    <div className={classes.controls}>
                                        {/*<button onClick={e => changeLocation(e, {*/}
                                        {/*    longitude: loc.coordinates[0],*/}
                                        {/*    latitude: loc.coordinates[1],*/}
                                        {/*    zoom: 12*/}
                                        {/*})}>*/}
                                        {/*    <Justicon icon={'edit'} className={classes.controlIcon}/>*/}
                                        {/*</button>*/}
                                        <button onClick={e => removeLocation(e, loc.address)}>
                                            <Justicon icon={'trash'} className={classes.controlIcon}/>
                                        </button>
                                    </div>
                                </div>
                                <MultiInput>
                                    <Input
                                        id={`address${loc.coordinates[0]+loc.coordinates[1]}`}
                                        type="text"
                                        name="address"
                                        label="Place"
                                        value={loc.address}
                                        onChange={e => onInputChange(e, loc.address)}
                                        // inputDescription="Feel free to modify or fix the address, the map location is tied to coordinates"
                                    />
                                    <Input
                                        id={`day${loc.coordinates[0]+loc.coordinates[1]}`}
                                        type="number"
                                        name="day"
                                        label="Days"
                                        value={loc.day}
                                        style={{flex: '0 0 8rem'}}
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

                    {submissionUI}
                </Form>
            </div>
        </div>
            </>
    )
}

const mSTP = s => ({
    newLocation: s.searchLocation.selLoc,
})
const mDTP = d => ({
    selectedLocation: clear => d(selectedLocation(clear)),
    startSearchLoc: vprt => d(startSearchLoc(vprt))
})

export default connect(mSTP, mDTP)(EditLocations)