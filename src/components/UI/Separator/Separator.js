import React from "react";
import classes from './Separator.module.css';

const Separator = (props) => {
    const styles = {
        margin: `${props.margin ? props.margin : '0'}rem 0`
    }
    return (
    <div className={[classes.Separator, classes[props.color]].join(' ')} style={styles}> </div>
    )
}

export default Separator