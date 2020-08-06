import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Search.module.css';
import StyledButton from '../../components/UI/StyledButton/StyledButton';
import classNames from 'classnames/bind'
import sprite from '../../assets/icons/sprite.svg';
import Participants from "./Participants";
import Locations from "./Locations";
import Date from "./Date";
import OutsideAlerter from "../../hocs/EventDelegator";
import moment from "moment";
import Justicon from "../../components/UI/JustIcon/Justicon";

const cx = classNames.bind(classes)

function Search(props) {
    const ref = useRef(null);
    const history = useHistory();
    const { searching } = props;

    function onInputEnter(e) {
        if (e.key === 'Enter') {
            searchHandler();
            e.preventDefault();
        }
    }

    useEffect(() => {
        ref.current.addEventListener('keydown', onInputEnter);
        return () => ref.current.removeEventListener('keydown', onInputEnter);
    }, [ref, onInputEnter])

    useEffect(() => {
        if (searching) {
            ref.current.focus();
        }
    }, [searching])

    const [ input, setInput ] = useState({
        locations: [],
        location: '',
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
                setInput(p => ({...p, participants: (+p.participants - 1).toString()}));
                break;
            case 'plusParticipant':
                setInput(p => ({...p, participants: (+p.participants + 1).toString()}));
                break;
            case 'minusMaxGroupSize':
                setInput(p => ({...p, maxGroupSize: (+p.maxGroupSize - 1).toString()}));
                break;
            case 'plusMaxGroupSize':
                setInput(p => ({...p, maxGroupSize: (+p.maxGroupSize + 1).toString()}));
                break;
            default:
                break;
        }
    }

    const eventHandler = async e => {
        const target = e.target
        setInput(p => ({...p, location: target.value}))
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
                date: p.focused.date ? false : id.includes('date'),
                participants: p.focused.participants ? false : id.includes('participants')
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

    const searchHandler = ( e, specificLoc ) => {
        if (e) e.preventDefault();
        if (!input.locations.length) {
            ref.current.focus();
            return;
        }

        const loc = specificLoc || input.locations[0]

        const qLocName = loc.place_name
            .split(',')
            .slice(-1)
            .toString()
            .trim();
        const qCoordinates = loc.geometry.coordinates.toString();
        const qDates = [+input.date.startDate, +input.date.endDate].toString();
        const qParticipants = [input.participants, input.maxGroupSize].toString();

        history.push(`/tours/search?place=${qLocName}&coordinates=${qCoordinates}&dates=${qDates}&participants=${qParticipants}`)
    }

    return (
        <form onSubmit={searchHandler} className={cx(classes.form, {formSearching: props.searching})}>
            <div className={`${classes.fieldBlock} ${classes.fieldBlockInput}`}>
                <OutsideAlerter className={classes.field} delegate={() => {
                    if (input.focused.location) {
                        setInput(p => ({...p, focused: {...p.focused, location: false}}))
                    }
                }}>
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
                            // onSubmit={() => console.log('aaaaaaaaaaaa')}
                            id='locationInput'
                            onChange={eventHandler}
                            onFocus={uiEventHandler}
                            value={input.location}
                            placeholder={'Where are you going?'}
                            className={classes.input}
                            autoComplete="off"
                        />
                    </label>
                    {input.focused.location && input.location !== '' && (
                        <button className={classes.clear} onClick={e => {
                            e.preventDefault();
                            setInput(p => ({...p, locations: [], location: ''}))
                        }}>
                            <Justicon icon={'x'} className={classes.clearIcon}/>
                        </button>
                    )}
                    {input.locations.length > 0 && input.focused.location && (
                        <Locations locations={input.locations} onSearch={searchHandler} />
                    )}
                </OutsideAlerter>
            </div>
            <div className={classes.sep} />
            <div className={classes.fieldBlock}>
                <OutsideAlerter className={classes.field} delegate={() => {
                    if (input.focused.date) {
                        setInput(p => ({...p, focused: {...p.focused, date: false}}))
                    }
                }}>
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
                                {!input.date.startDate ? 'Add date' : (
                                    <>
                                        <h4 className={classes.filterText}>
                                            {moment(+input.date.startDate).format('DD MMM')}
                                        </h4>
                                        {input.date.endDate && (
                                            <h4 className={classes.filterText}>
                                                &nbsp;-&nbsp;{moment(+input.date.endDate).format('DD MMM')}
                                            </h4>
                                        )}
                                    </>
                                )}
                            </div>
                        </button>
                        {input.focused.date && (input.date.startDate !== null || input.date.endDate !== null) && (
                            <button className={classes.clear} onClick={e => {
                                e.preventDefault();
                                setInput(p => ({...p, date: { startDate: null, endDate: null, focusedInput: 'startDate'}}))
                            }}>
                                <Justicon icon={'x'} className={classes.clearIcon}/>
                            </button>
                        )}
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
                <OutsideAlerter className={classes.field} delegate={() => {
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
                            {input.participants !== '1' && (
                                    <h4 className={classes.filterText}>
                                        {input.participants}&nbsp;par.
                                    </h4>
                            )}
                            {input.maxGroupSize !== '25' && (
                                <h4 className={classes.filterText}>
                                    &nbsp;Max&nbsp;{input.maxGroupSize}
                                </h4>
                            )}
                            {input.maxGroupSize === '25' && input.participants === '1' && (
                                'Add participants'
                            )}
                        </div>
                    </button>
                    {input.focused.participants && (input.participants !== '1' || input.maxGroupSize !== '25') && (
                        <button className={classes.clear} onClick={e => {
                            e.preventDefault();
                            setInput(p => ({...p, participants: '1', maxGroupSize: '25'}))
                        }}>
                            <Justicon icon={'x'} className={classes.clearIcon}/>
                        </button>
                    )}
                    {input.focused.participants && (
                        <Participants participantsHandler={participantsHandler}
                                      participants={+input.participants}
                                      maxGroupSize={+input.maxGroupSize}
                        />
                    )}
                </OutsideAlerter>
            </div>
            <div className={classes.but}>
                <StyledButton type="submit"
                              rounded={props.searching}
                              round={!props.searching}>
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
