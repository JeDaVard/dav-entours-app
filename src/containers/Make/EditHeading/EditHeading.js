import React, {useEffect, useState} from "react";
import classes from './EditHeading.module.css'

function EditHeading(props) {
    const {
        name,
        summary,
        description,
        difficulty,
        hashtags,
        maxGroupSize,
        price
    } = props;

    const [ state, setState ] = useState({
        name,
        summary,
        description,
        difficulty,
        hashtags,
        maxGroupSize,
        price
    });

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedState = {
            ...state,
            [name]: value
        }
        setState(updatedState)
    }
    return (
        <div className="row">
            <form action="" >
                <input type="text" name={'name'} value={state.name} onChange={onInputChange}/>
                <select name="difficulty" value={state.difficulty} onChange={onInputChange}>
                    <option value={'easy'}>Easy</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'hard'}>Easy</option>
                </select>
                <select name="maxGroupSize" value={state.maxGroupSize} onChange={onInputChange}>
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={25}>25</option>
                    <option value={26}>26</option>
                </select>
                <textarea name={'summary'} value={state.summary} onChange={onInputChange}/>
                <textarea name={'description'} value={state.description} onChange={onInputChange}/>
                <input type="text" name={'hashtags'} value={state.hashtags} onChange={onInputChange}/>
            </form>
        </div>
    )
}

export default EditHeading