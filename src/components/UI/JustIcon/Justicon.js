import React from "react";
import classes from './Justicon.module.css';
import sprite from '../../../assets/icons/sprite.svg'

const Justicon = props => {
    return (
        <svg className={props.className ? props.className : classes.Justicon}>
            <use href={sprite + `#icon-${props.icon}`} />
        </svg>
    )
}

export default Justicon