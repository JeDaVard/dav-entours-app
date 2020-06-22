import React from "react";
import classes from './LabeledInput.module.css';
import Justicon from "../Justicon";

export function Input(props) {
    const {
        inputDescription,
        label,
        type,
        name,
        id,
        value,
        onChange,
        autoComplete,
        required
    } = props;

    return (
        <div className={classes.inputBox}>
            <div className={classes.input}>
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete ? "on" : "off"}
                    required={required}
                />
                <label htmlFor={id}>{label}</label>
            </div>
            <p className={classes.inputHint}>
                {inputDescription}
            </p>
        </div>
    )
}

export function Form(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div className={classes.form}>
                {props.children}
            </div>
        </form>
    )
}

export function Select(props) {
    const {
        name,
        options,
        value,
        onChange,
    } = props;

    return (
        <div className={classes.inputBox}>
            <div className={classes.input}>
                <select name={name} value={value} onChange={onChange}>
                    {options.map(o => (
                        <option key={o.option} value={o.value}>{o.option}</option>
                    ))}
                </select>
                <Justicon icon={'chevron-down'} className={classes.selectIcon} />
            </div>
        </div>
    )
}

export function MultiInput(props) {
    return (
        <div className={classes.inputs}>
            {props.children}
        </div>
    )
}

export function Textarea(props) {
    const {
        label,
        id,
        name,
        rows,
        value,
        onChange
    } = props;

    return (
        <div className={classes.inputBox}>
            <div className={classes.input}>
                <textarea
                    name={name}
                    id={id}
                    // cols="100"
                    rows={rows}
                    onChange={onChange}
                    value={value}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        </div>
    )
}