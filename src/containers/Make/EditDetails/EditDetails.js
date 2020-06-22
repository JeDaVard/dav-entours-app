import React, {useState} from "react";
import classes from './EditDetails.module.css'
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import Justicon from "../../../components/UI/Justicon";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {Form, Input, Textarea} from "../../../components/UI/LabeledInput/LabeledInput";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_HEADING} from "../queries";

function EditDetails(props) {
    const history = useHistory()
    const {
        _id,
        slug,
        name,
        summary,
        description,
        difficulty,
        hashtags,
        maxGroupSize,
        price,
        draft
    } = props;

    const [ state, setState ] = useState({
        name,
        summary,
        description,
        difficulty,
        hashtags: hashtags.join(', '),
        maxGroupSize,
        price
    });

    const [ mutateTourHeading, { loading } ] = useMutation(EDIT_TOUR_HEADING, {
        variables: {
            id: _id,
            name: state.name,
            difficulty: state.difficulty,
            maxGroupSize: state.maxGroupSize,
            hashtags: state.hashtags.split(',').map(hash => hash.trim()).join(',')
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
        console.log(draft, 'redirecting?')
        mutateTourHeading()
            .then(res => {
                if (draft) {
                    history.push(`/tour/${res.data.tourHeading.data.slug}/edit/locations`)
                }
            })
    }
    return (
        <div className="row">
            <Form onSubmit={onTourDetails}>
                <Input
                    type='text'
                    label="Summary"
                    id="tourSummary"
                    onChange={onInputChange}
                />
                <Textarea
                    onChange={onInputChange}
                    id="tourDescription"
                    label="Description"
                    rows={'5'}
                />
            </Form>
        </div>
    )
}

export default EditDetails