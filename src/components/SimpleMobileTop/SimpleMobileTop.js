import React from "react";
import classes from "./SimpleMobileTop.module.css";
import classNames from 'classnames/bind';
import NavButton from "../UI/NavButton/NavButton";
import Justicon from "../UI/JustIcon/Justicon";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading";
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
                    {props.button && (
                        <button
                            disabled={props.disabled}
                            type={props.type}
                            onClick={props.onClick ? (e) => props.onClick(e) : () => {}}
                            className={cx(classes.topNavButton, {
                                [classes.topNavButtonDisabled]: props.disabled,
                                [classes.topNavButtonInverse]:props.inverseButton
                            })}>
                            {props.loading && (
                                // <DotLoading small/>
                                <ButtonLoading />
                            )}
                            <div className={cx(classes.topNavButtonLabel, {[classes.topNavButtonLabelLoading]: props.loading})}>
                                <span>{props.button}&nbsp;</span>
                                <Justicon icon={props.icon} className={classes.topNavButtonIcon}/>
                            </div>

                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SimpleMobileTop