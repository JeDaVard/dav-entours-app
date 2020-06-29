import React from "react";
import classes from './Separator.module.css';

const Separator = (props) => {
    const styles = {
        margin: props.vertical ? (
            `${props.margin ? `0  ${props.margin.split(' ')[1]}rem 0 ${props.margin.split(' ')[0]}rem`: '0'}`
        ) : (
            `${props.margin ? props.margin.split(' ')[0]+'rem 0 ' + props.margin.split(' ')[1]+'rem 0': '0'}`
        )
    }

    if (props.height) styles.height = props.height+'rem';

    return (
        <>
            {props.vertical ? (
                <div className={[classes.vertical, classes[props.color]].join(' ')} style={styles}> </div>
            ) : (
                <div className={[classes.Separator, classes[props.color]].join(' ')} style={styles}> </div>
            )}
        </>
    )
}

export default Separator