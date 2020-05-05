import React from "react";
import classes from './Separator.module.css';

const Separator = (props) => (
    <div className={[classes.Separator, classes[props.color]].join(' ')}> </div>
)

export default Separator