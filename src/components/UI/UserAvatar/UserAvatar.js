import React from "react";
import classes from './UserAvatar.module.css';

export default function UserAvatar(props) {
    const { src, className, alt, big, medium } = props;

    const isBase64 = src.toLowerCase().startsWith('data:')

    let size = big ? '.large' : medium ? '.medium' : '';
    let theSrc = src.slice(0, src.length - 4) + size + src.slice(-4)

    return (
        <img src={isBase64 ? src : `${process.env.REACT_APP_CDN}/${theSrc}`}
             className={classes.image + ' ' + className || ''}
             alt={alt} />
    )
}