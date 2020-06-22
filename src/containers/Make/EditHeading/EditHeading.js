import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import classes from './EditHeading.module.css'
import Justicon from "../../../components/UI/Justicon";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {EDIT_TOUR_HEADING} from "../queries";
import TopLoading from "../../../components/UI/TopLoading/TopLoading";
import {Form, Input, MultiInput, Select} from "../../../components/UI/LabeledInput/LabeledInput";

function EditHeading(props) {
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

    const maxGroupSizeOptions = []
    for (let i = 1; i <= 25; i++) {
        maxGroupSizeOptions.push({value: i, option: `Group of ${i}`})
    }
    const difficultyOptions = [
        {value: 'easy', option: 'Easy'},
        {value: 'medium', option: 'Medium'},
        {value: 'hard', option: 'Hard'}
    ]

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedState = {
            ...state,
            [name]: value
        }
        setState(updatedState)
    }

    const onTourHeading = e => {
        e.preventDefault();
console.log(draft, 'redirecting?')
        mutateTourHeading()
            .then(res => {
                if (draft) {
                    history.push(`/tour/${res.data.tourHeading.data.slug}/edit/locations`)
                }
            })
    }
    const buttonText = props.draft ? <>Save & Next &#8594;</> : <>Save &#10003;</>
    return (
        <div className="row">
            { loading && <TopLoading />}
            <Form onSubmit={onTourHeading}>
                <Input
                    label="Name"
                    type="text"
                    name="name"
                    id="tourNameInput"
                    value={state.name}
                    onChange={onInputChange}
                    autoComplete="off"
                    required
                    inputDescription="This is the tour name displayed
                    in the listing, also it is used to generate a permanent tour link"
                />
                <MultiInput>
                    <Select
                        name={'difficulty'}
                        options={difficultyOptions}
                        value={state.difficulty}
                        onChange={onInputChange}
                    />
                    <Select
                        name={'maxGroupSize'}
                        options={maxGroupSizeOptions}
                        value={state.maxGroupSize}
                        onChange={onInputChange}
                    />
                </MultiInput>
                <Input
                    label="Hashtags"
                    id="tourHashtagsInput"
                    name="hashtags"
                    style={{fontSize: '1.6rem'}}
                    value={state.hashtags}
                    onChange={onInputChange}
                    autoComplete="off"
                    required
                    inputDescription="Do not enter hashtags from tour
                    name, because we'll automatically generate it"
                />

                <StyledButton type={'submit'}>{loading ? <>Saving...</> : buttonText}</StyledButton>
                {/*<textarea name={'summary'} value={state.summary} onChange={onInputChange}/>*/}
                {/*<textarea name={'description'} value={state.description} onChange={onInputChange}/>*/}
            </Form>
        </div>
    )
}

export default EditHeading