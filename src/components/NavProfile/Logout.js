import React from "react";
import classes from './Logout.module.css'
import { SIGN_OUT } from './queries'
import {useMutation} from "@apollo/client";
import {removeCookie} from "../../utils/cookies";

const Logout = props => {
    const [signOut ] = useMutation(SIGN_OUT);

    const onLogout = () => {
        props.onClose && props.onClose();
        localStorage.setItem('photo', 'assets/icons/default.svg');
        localStorage.setItem('name', 'Entours');

        signOut()
            .then(() => {
                removeCookie('userId')
                window.location.replace('/')
            })
    }

    return <button className={classes.button} onClick={onLogout}><li>{props.children}</li></button>
}

export default Logout