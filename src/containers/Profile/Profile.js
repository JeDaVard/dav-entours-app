import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../components/Topbar/Navigation/Logout";
import classes from './Profile.module.css';
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";

function Profile(props) {
    return (
        <div className={classes.Profile}>
            <div className="row">
                <div className={classes.Profile__top}>
                    <div>
                        <h2 className={classes.Profile__name} >Hey, {props.name}!</h2>
                        <Link to={`/user/${props.userId}`} className={classes.Profile__full} >Profile view</Link>
                    </div>
                    <div>
                        <img src={`${process.env.REACT_APP_SERVER}/images/user/${props.photo}`} alt={props.name.split(' ')[0]} className={classes.Profile__photo}/>
                    </div>
                </div>
                <div className={classes.Profile__makeTour}>
                    <StyledButton to={'/make'} >Make A Tour</StyledButton>
                </div>
                <div className={classes.Profile__mainMenu}>
                    <ul>
                        <Link to={'/mytours'}><li>My Tours</li></Link>
                        <Link to={'/'}><li>Payments & Payouts</li></Link>
                        <Link to={'/'}><li>Personal Info</li></Link>
                        <Link to={'/'}><li>Login & Security</li></Link>
                    </ul>
                </div>
                <Separator color={'light'} margin={'4 0'}/>
                <div className={classes.Profile__bottom}>
                    <div className={classes.Profile__geo}>
                        <Link to={'/'}>$ Currency</Link>
                        <Link to={'/'}>English (US)</Link>
                    </div>
                    <ul className={classes.Profile__out}>
                        <Link to={'/'}><li>Help</li></Link>
                        <Logout>Logout</Logout>
                    </ul>
                    <Link to={'/'} className={classes.Profile__deactivate}>Need to deactivate?</Link>
                </div>
            </div>
        </div>
    )
}

export default Profile