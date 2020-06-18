import React from "react";
import classes from './Input.module.css'
import Justicon from "../Justicon";

function Input(props) {
    if (props.options) return (
        <label className={classes.makeInputBox}>
            Select one
            <select className={classes.select} name={props.name} >
                {props.options.map(option => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))}
            </select>
            <Justicon icon={'chevron-down'} className={classes.arrow}/>
        </label>
    )
    return (
        <label className={classes.makeInputBox}>
            <input type="text" name={props.name} className={classes.makeInput} placeholder={props.placeholder}/>
        </label>
    )
}

export default Input