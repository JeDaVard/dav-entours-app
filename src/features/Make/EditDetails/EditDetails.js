import React, {useState} from "react";
import classes from './EditDetails.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {Form, Input, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import SimpleInput from '../../../components/UI/Input/Input'
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_DETAILS} from "../queries";
import SimpleMobileTop from "../../../components/SimpleMobileTop/SimpleMobileTop";
import Separator from "../../../components/UI/Separator/Separator";
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import moment from "moment";
import './_date.css'
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import { createArrSkeleton } from "../../../utils/arrUtil";
import RoundLoading from "../../../components/UI/RoundLoading/RoundLoading";

const time = createArrSkeleton(4).map((item, index) => index.toString())
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .map((item, index) => ({name: item, value: index}))
const years = createArrSkeleton(4).map((item, index) => new Date(Date.now()).getFullYear() + index)
    .map((item, index) => ({name: item.toString(), value: index}));

function EditDetails(props) {
    const history = useHistory()
    const {
        _id,
        // slug,
        summary,
        description,
        draft
    } = props;

    const [ state, setState ] = useState({

        summary,
        description,
    });

    const [ startDate, setStartDate ] = useState({
        focused: false,
        date: null
    })

    const inputHandler = e => {

    }

    const [ mutateTourHeading, { loading } ] = useMutation(EDIT_TOUR_DETAILS, {
        variables: {
            id: _id,
            summary: state.summary,
            description: state.description,
        }
    })

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedState = {
            ...state,
            [name]: value
        }
        setState(updatedState)
    }

    const onTourDetails = e => {
        e.preventDefault();
        mutateTourHeading()
            .then(res => {
                if (draft) {
                    history.push(`/mytours`)
                }
            })
    }
    const buttonText = props.draft ? <>Finish</> : <>Save &#10003;</>;
    const submissionUI = props.isMobile ? (
        <SimpleMobileTop
            to={props.draft ? `/mytours?tab=draft` : `/mytours`}
            button={props.draft ? 'Finish' : 'Save'}
            type={'submit'}
            icon={'check'}
            children={'Details'}
            loading={loading}
            shadow
            fixed
            top
        />
    ) : (
        <div className={classes.button}>
            <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
        </div>
    );
    console.log(startDate)
    return (
        <div className="row">
            { loading && <TopLoading />}
            <div className={classes.main}>
                <Form onSubmit={onTourDetails}>
                    <div className={classes.addStarting}>
                        <SmallShow
                            handler={(trigger, opposite) => trigger(!opposite)}
                            button={
                                <div className={classes.addButton}>
                                    <Justicon icon={'plus'} />
                                        <span><b>Add Starting Date</b></span>
                                </div>
                            }
                        >
                            <div className={classes.dateBlock}>
                                <div className={classes.dateTop}>
                                    <h2>Starting Dates</h2>
                                </div>
                                <Separator margin={'1 0'} color={'normal'} />
                                <div className={classes.main}>
                                    <div>

                                    </div>
                                    <div>
                                        <SimpleInput
                                            name={'dayInput'}
                                            value={new Date(Date.now()).getMonth()}
                                            onChange={inputHandler}
                                            placeholder={new Date(Date.now()).getDate()+1}
                                        />
                                        <SimpleInput
                                            name={'monthInput'}
                                            value={new Date(Date.now()).getMonth()}
                                            onChange={inputHandler}
                                            options={months}/>
                                        <SimpleInput
                                            name={'yearInput'}
                                            value={years[0]}
                                            onChange={inputHandler}
                                            options={years}/>
                                    </div>
                                    <StyledButton>
                                        Add
                                    </StyledButton>
                                        {/*<button disabled={loading} className={classes.add} onClick={e => {}}>*/}
                                        {/*    {loading ? <RoundLoading /> : <Justicon*/}
                                        {/*        className={`${classes.inviteIcon} ${classes.adInviteIcon}`}*/}
                                        {/*        icon={'plus'} />}*/}
                                        {/*</button>*/}
                                </div>

                            </div>
                        </SmallShow>
                    </div>

                    <Separator margin={'2 3'} color={'light'}/>
                    <Textarea
                        maxLength={800}
                        onChange={onInputChange}
                        id="firstMessageInput"
                        label="Message"
                        name="firstMessage"
                        value={state.description}
                        rows={'4'}
                        required
                    />
                    <Separator margin={'2 3'} height={'1'} color={'light'}/>
                    <Input
                        type='text'
                        name="summary"
                        label="Summary"
                        id="tourSummaryInput"
                        value={state.summary}
                        onChange={onInputChange}
                        inputDescription="Think of an addition of the title, or a very short description"
                    />
                    <Textarea
                        maxLength={800}
                        onChange={onInputChange}
                        id="tourDescriptionInput"
                        label="Description"
                        name="description"
                        value={state.description}
                        rows={'8'}
                        required
                    />
                    {submissionUI}
                </Form>
            </div>
        </div>
    )
}

export default EditDetails