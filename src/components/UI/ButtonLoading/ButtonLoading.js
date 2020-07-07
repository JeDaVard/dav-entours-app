import React from 'react';
import classes from './ButtonLoading.module.css';
import classNames from 'classnames/bind'
const cx = classNames.bind(classes)

export default function ButtonLoading(props) {
    return (
        <div className={classes.container}>
            <div className={cx(classes.loading, {
                [classes.loadingPrimary]: props.primary,
                [classes.loadingBlack]: props.black
            })}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}