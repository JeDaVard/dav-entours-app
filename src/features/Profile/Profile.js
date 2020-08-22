import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../components/NavProfile/Logout";
import classes from './Profile.module.css';
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import Separator from "../../components/UI/Separator/Separator";
import UserAvatar from "../../components/UI/UserAvatar/UserAvatar";
import {SHOW_PROFILE_PHOTO} from "../../app/actions/ui/types";
import {useDispatch} from "react-redux";
import {useMutation, gql} from "@apollo/client";
import {removeCookie} from "../../utils/cookies";
import SmallShow from "../../components/UI/SmallShow/SmallShow";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";

function Profile(props) {
    const dispatch = useDispatch();

    const [ deactivate ] = useMutation(gql`
		mutation Deactivate {
            deactivate
        }
    `)

    const deactivateHandler = e => {
        e.preventDefault();

        deactivate()
            .then(_ => {
                localStorage.setItem('photo', 'assets/icons/default.svg');
                localStorage.setItem('name', 'Entours');

                removeCookie('userId')
                window.location.replace('/')
            })
    }

    return (
        <div className={classes.Profile}>
            <div className="row">
                <div className={classes.top}>
                    <div>
                        <h2 className={classes.name} >Hey, {props.name}!</h2>
                        <Link to={`/user/${props.userId}`} className={classes.full} >Profile view</Link>
                    </div>
                    <div>
                        <Link to={'#'} onClick={() => dispatch({type: SHOW_PROFILE_PHOTO})}>
                            <div className={classes.photoFrame}>
                                <UserAvatar alt={props.name.split(' ')[0]}
                                            className={classes.photo}
                                            src={props.photo}/>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={classes.makeTour}>
                    <StyledButton to={'/make'} >Make A Tour</StyledButton>
                </div>
                <div className={classes.mainMenu}>
                    <ul>
                        <Link to={`/user/${props.userId}`}><li>Profile View</li></Link>
                        <Link to={'/mytours'}><li>My Tours</li></Link>
                        <Link to={'#'} onClick={() => dispatch({type: SHOW_PROFILE_PHOTO})}><li>Edit Profile</li></Link>
                        <Link to={'/'}><li>Payments & Payouts</li></Link>
                        <Link to={'/'}><li>Login & Security</li></Link>
                    </ul>
                </div>
                <Separator color={'light'} margin={'2 2'}/>
                <div className={classes.bottom}>
                    <ul className={classes.out}>
                        <Link to={'/'}><li>Help</li></Link>
                        <Logout>Logout</Logout>
                    </ul>
                    <SmallShow
                        handler={(trigger, opposite) => trigger(!opposite)}
                        button={
                            <p className={classes.deactivate}>Need to deactivate?</p>
                        }
                        className={classes.deactivateBlock}
                    >
                        <div className={classes.deactivateText}>
                            <h4>Are you sure?</h4>
                            <p>If you click on Deactivate button, in Entours you will be unavailable for other users, your profile will be deactivated. But you can come back anytime, by just logging in.</p>
                        </div>
                        <SimpleButton onClick={deactivateHandler}>
                            Deactivate
                        </SimpleButton>
                    </SmallShow>
                </div>
            </div>
        </div>
    )
}

export default Profile