import React from "react";
import { removeCookie } from "../../../utils/cookies";


const Logout = props => {
    const onLogout = () => {
        props.onClose && props.onClose();
        removeCookie('authToken', 'exp', 'userId');
        localStorage.setItem('photo', 'default.jpg')
        localStorage.setItem('name', 'Entours')
    }

    return (
        <>
            <a href={'/'} onClick={onLogout}><li>{props.children}</li></a>
            </>
    )
}

export default Logout