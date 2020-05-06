import React from 'react';
import classes from './Image.module.css';

const Image = props => (
    <div
        className={classes.Image}
        style={{
            backgroundImage: `url('${props.url}')`,
            backgroundSize: props.contain ? 'contain' : 'cover',
            backgroundPosition: props.left ? 'left' : 'center'
        }}
    />
);

export default Image;
