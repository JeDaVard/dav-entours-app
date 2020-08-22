import React from "react";
import classes from './Justicon.module.css';
// import sprite from '../../../assets/icons/sprite.svg'
import { icons } from '../../../assets/icons/moon'

const Justicon = props => {
    const Icon = icons[props.icon]
    return (
        // <svg className={props.className ? props.className : classes.Justicon}>
        //     <use href={sprite + `#icon-${props.icon}`} />
        // </svg>
        <Icon className={props.className ? props.className : classes.Justicon}/>
    )
}

// const Justicon = props => {
//     let icon = props.icon;
//
//     if (props.icon.includes('-')) {
//         let iA = props.icon.split('-')
//         icon = iA[0] + iA[1][0].toUpperCase() + iA[1].slice(1)
//     }
//
//     console.log(icons[icon])
//     return (
//         <svg className={props.className ? props.className : classes.Justicon}>
//             <use href={icons[icon]} />
//         </svg>
//     )
// }

export default Justicon