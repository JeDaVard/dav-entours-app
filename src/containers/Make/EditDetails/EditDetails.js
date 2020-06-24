import React, {useState} from "react";
import classes from './EditDetails.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import Justicon from "../../../components/UI/Justicon";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {Form, Input, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_DETAILS} from "../queries";
import SimpleMobileTop from "../SimpleMobileTop";
import {connect} from "react-redux";

function EditDetails(props) {
    const history = useHistory()
    const {
        _id,
        slug,
        summary,
        description,
        draft
    } = props;

    const [ state, setState ] = useState({
        summary,
        description,
    });

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
            to={`/tour/${props.slug}/edit/heading`}
            button={props.draft ? 'Finish' : 'Save'}
            type={'submit'}
            icon={'check'}
            children={'Details'}
            loading={loading}
            top
        />
    ) : (
        <div className={classes.button}>
            <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
        </div>
    );
    return (
        <div className="row">
            { loading && <TopLoading />}
            <div className={classes.main}>
                <Form onSubmit={onTourDetails}>
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


const mSTP = s => ({
    isMobile: s.ui.display.isMobile,
})

export default connect(mSTP)(EditDetails)