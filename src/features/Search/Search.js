import React, {useEffect, useRef, useState} from 'react';
import classes from './Search.module.css';
import StyledButton from '../../components/UI/StyledButton/StyledButton';
import classNames from 'classnames/bind'
import sprite from '../../assets/icons/sprite.svg';
import Participants from "./Participants";
import Locations from "./Locations";
import Date from "./Date";
import OutsideAlerter from "../../hocs/EventDelegator";
import moment from "moment";

const cx = classNames.bind(classes)

function Search(props) {
    const ref = useRef(null);
    const { searching } = props;

    useEffect(() => {
        if (searching) {
            ref.current.focus();
        }
    }, [searching, ref])

    const [ input, setInput ] = useState({
        locations: [],
        date: {
            startDate: null,
            endDate: null,
            focusedInput: 'startDate'
        },
        participants: '1',
        maxGroupSize: '25',
        focused: {
            location: false,
            date: false,
            participants: false
        }
    })

    const participantsHandler = e => {
        e.preventDefault();
        const id = e.currentTarget.id;

        switch (id) {
            case 'minusParticipant':
                setInput(p => ({...p, participants: +p.participants - 1}));
                break;
            case 'plusParticipant':
                setInput(p => ({...p, participants: +p.participants + 1}));
                break;
            case 'minusMaxGroupSize':
                setInput(p => ({...p, maxGroupSize: +p.maxGroupSize - 1}));
                break;
            case 'plusMaxGroupSize':
                setInput(p => ({...p, maxGroupSize: +p.maxGroupSize + 1}));
                break;
            default:
                break;
        }
    }

    const eventHandler = async e => {
        const target = e.target
        try {
            if (target.value !== '') {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&limit=5`)
                const data = await res.json()
                setInput(p => ({...p, locations: data.features}))
            } else {
                setInput(p => ({...p, locations: []}))
            }
        } catch (e) {
            console.log('error')
        }
    }

    const uiEventHandler = e => {
        e.preventDefault();
        const id = e.currentTarget.id
        setInput(p => ({
            ...p,
            focused: {
                location: id.includes('location'),
                date: id.includes('date'),
                participants: id.includes('participants')
            }
        }))
    }

    function onDatesChange({ startDate, endDate }) {
        setInput(p => ({
            ...p,
            date: {
                startDate,
                endDate,
                focusedInput: 'endDate'
            }
        }));
    }

    function onFocusChange(focusedInput) {
        setInput(p => ({
            ...p,
            // Force the focusedInput to always be truthy so that dates are always selectable
            date: {
                ...p.date,
                focusedInput: !focusedInput ? 'startDate' : focusedInput
            }
        }));
    }
console.log(input.date)
    return (
        <form onSubmit={() => {}} className={cx(classes.form, {formSearching: props.searching})}>
            <div className={`${classes.fieldBlock} ${classes.fieldBlockInput}`}>
                <div className={classes.field}>
                    <label id="locationLabel"
                           className={cx(classes.label, {
                        labelSearching: props.searching,
                        labelActive: input.focused.location
                    })}>
                        <div className={classes.buttonBox__title}>
                            Location
                        </div>
                        <input
                            ref={ref}
                            type="text"
                            name='location'
                            id='locationInput'
                            onChange={eventHandler}
                            onFocus={uiEventHandler}
                            value={input.location}
                            placeholder={'Where are you going?'}
                            className={classes.input}
                            autoComplete="off"
                        />
                    </label>
                </div>
                <OutsideAlerter delegate={() => {
                    if (input.focused.location) {
                        setInput(p => ({...p, focused: {...p.focused, location: false}}))
                    }
                }}>
                    {input.locations.length > 0 && input.focused.location && (
                        <Locations locations={input.locations}/>
                    )}
                </OutsideAlerter>
            </div>
            <div className={classes.sep} />
            <div className={classes.fieldBlock}>
                    <div className={classes.field}>
                        <button
                            onClick={uiEventHandler}
                            id="dateButton"
                            className={cx(classes.button, {
                            buttonSearching: props.searching,
                            buttonActive: input.focused.date
                        })}>
                            <div className={classes.buttonBox__title}>
                                Dates
                            </div>
                            <div className={classes.buttonBox__selection}>
                                {input.date.startDate}
                            </div>
                        </button>
                    </div>
                <OutsideAlerter delegate={() => {
                    if (input.focused.date) {
                        setInput(p => ({...p, focused: {...p.focused, date: false}}))
                    }
                }}>
                    {input.focused.date && (
                            <div className={classes.date}>
                                <Date startDate={input.date.startDate}
                                      endDate={input.date.endDate}
                                      focusedInput={input.date.focusedInput}
                                      onDatesChange={onDatesChange}
                                      onFocusChange={onFocusChange}/>
                            </div>
                    )}
                </OutsideAlerter>
            </div>
            <div className={classes.sep} />
            <div className={classes.fieldBlock}>
                <div className={classes.field}>
                    <button
                        onClick={uiEventHandler}
                        id="participantsButton"
                        className={cx(classes.button, {
                        buttonSearching: props.searching,
                        buttonActive: input.focused.participants
                    })}>
                        <div className={classes.buttonBox__title}>
                            Participants
                        </div>
                        <div className={classes.buttonBox__selection}>
                            Add participants
                        </div>
                    </button>
                </div>
                <OutsideAlerter delegate={() => {
                    if (input.focused.participants) {
                        setInput(p => ({
                            ...p,
                            focused: {
                                ...p.focused,
                                participants: false
                            }
                        }))
                    }
                }}>
                    {input.focused.participants && (
                        <Participants participantsHandler={participantsHandler}
                                      participants={+input.participants}
                                      maxGroupSize={+input.maxGroupSize}
                        />
                    )}
                </OutsideAlerter>
            </div>
            <div className={classes.but}>
                <StyledButton rounded={props.searching} round={!props.searching}>
                    {props.searching ? (
                            <>
                                <svg>
                                    <use href={sprite + '#icon-search'} />
                                </svg>
                                <span>Search</span>
                            </>
                    ) : (
                        <>
                            <span style={{position: 'absolute', paddingLeft: '3px', marginTop: '-2px'}}>
                                <svg style={{width: '2rem', height: '2rem'}}>
                                    <use href={sprite + '#icon-search'} />
                                </svg>
                            </span>
                            <span style={{opacity: '0'}}>S</span>
                        </>)}
                </StyledButton>
            </div>
        </form>
    );
}

export default Search;
