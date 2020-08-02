import React from "react";
import classes from "./Logo.module.css";
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export default function Logo(props) {
    return (
        <Link
            to={'/'}
            className={classes.to}
        >
            <div className={cx(classes.logo, {
                [classes.logoPrimary]: props.primary,
                [classes.logoBlack]: props.black
            })}
            />
        </Link>
    )
}