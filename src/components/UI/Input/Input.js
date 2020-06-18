import React from "react";
import classes from './Input.module.css'
import Justicon from "../Justicon";

function Input(props) {
    if (props.options) return (
        <label className={classes.makeInputBox}>
            Select one
            <select value={props.value} className={classes.select} name={props.name} onChange={props.onChange}>
                {props.options.map(option => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))}
            </select>
            <Justicon icon={'chevron-down'} className={classes.arrow}/>
        </label>
    )
    return (
        <label className={classes.makeInputBox}>
            <input type={props.type} name={props.name} onChange={props.onChange} className={classes.makeInput} placeholder={props.placeholder} autoComplete={props.autoComplete ? 'on' : 'off'}/>
        </label>
    )
}

export default Input