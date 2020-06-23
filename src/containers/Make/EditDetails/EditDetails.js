import React, {useState} from "react";
import classes from './EditDetails.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import Justicon from "../../../components/UI/Justicon";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {Form, Input, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_DETAILS} from "../queries";

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
                    history.push(`/tour/${slug}/edit/locations`)
                }
            })
    }
    const buttonText = props.draft ? <>Finish</> : <>Save &#10003;</>;

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
                    <div className={classes.button}>
                        <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditDetails