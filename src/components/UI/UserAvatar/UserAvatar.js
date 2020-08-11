import React from "react";
import classes from './UserAvatar.module.css';

export default function UserAvatar(props) {
    const { src, className, alt, big, medium } = props;

    let size = big ? '.large' : medium ? '.medium' : '';
    const theSrc = src.slice(0, src.length - 4) + size + src.slice(-4);

    return (
        <img src={`${process.env.REACT_APP_CDN}/${theSrc}`}
             className={classes.image + ' ' + className || ''}
             alt={alt} />
    )
}