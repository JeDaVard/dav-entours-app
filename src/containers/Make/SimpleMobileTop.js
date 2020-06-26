import React from "react";
import classes from "./SimpleMobileTop.module.css";
import classNames from 'classnames/bind';
import NavButton from "../../components/UI/NavButton/NavButton";
import Justicon from "../../components/UI/Justicon";
import DotLoading from "../../components/UI/DotLoading/DotLoading";
let cx = classNames.bind(classes);

function SimpleMobileTop(props) {
    return (
        <div className={cx(classes.topNav, {
            [classes.topNav0]: props.top,
            [classes.topNavFixed]: props.fixed,
            [classes.topNavShadow]: props.shadow,
        })}>
            <div className="row">
                <div className={classes.topNavItems}>
                    <NavButton to={props.to}/>
                    <h2 className={classes.topNavTitle}>{props.children}</h2>
                    <button
                        disabled={props.disabled}
                        type={props.type}
                        onClick={props.onClick ? (e) => props.onClick(e) : () => {}}
                        className={cx(classes.topNavButton, {
                            [classes.topNavButtonDisabled]: props.disabled,
                            [classes.topNavButtonInverse]:props.inverseButton
                        })}>
                        {props.loading && (
                            <DotLoading small/>
                        )}
                            <div className={cx(classes.topNavButtonLabel, {[classes.topNavButtonLabelLoading]: props.loading})}>
                                <span>{props.button}</span>
                                <Justicon icon={props.icon} className={classes.topNavButtonIcon}/>
                            </div>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default SimpleMobileTop