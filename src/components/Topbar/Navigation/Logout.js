import React from "react";
import {logout} from "../../../app/actions";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

const Logout = props => {
    const onLogout = () => {
        props.onClose();
        props.logout();
    }
    return (
        <>
            <Link to={'/'} onClick={onLogout}><li>{props.children}</li></Link>
            </>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(null, mapDispatchToProps)(Logout)