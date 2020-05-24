import React from "react";
import classes from './OnlyAuth.module.css';
import img from './a.jpg';
import StyledButton from "../components/StyledButton/StyledButton";
import {Link} from "react-router-dom";
import Separator from "../components/UI/Separator/Separator";

function OnlyAuth(props) {
    return (
        <div className={classes.OnlyAuth}>
            <div className="row">
                <div>
                    <h2 className={classes.OnlyAuth__title}>Sign Up</h2>
                    <Separator margin={'2 2'} color={'normal'} />
                    <div className={classes.OnlyAuth__content}>
                        <img src={img} alt="" className={classes.OnlyAuth__illustration} />
                        <StyledButton onClick={props.signUp}>Continue</StyledButton>
                        <div>
                            <h2 className={classes.OnlyAuth__switchText}>Already have account?</h2> <Link to={loc => loc} onClick={props.login}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnlyAuth