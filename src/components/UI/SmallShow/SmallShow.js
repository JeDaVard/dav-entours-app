import React, {useState} from "react";
import classes from './SmallShow.module.css';
import OutsideAlerter from "../../../hocs/EventDelegator";

const SmallShow = props => {
    const [ show, setShow ] = useState(false);


    return (
        <div className={classes.main}>
            <OutsideAlerter delegate={() => setShow(false)}>
            <button
                    className={classes.button}
                    onClick={() => props.handler(setShow, show)}>
                {props.button || (
                    'Show'
                )}
            </button>
            {show && (
                    <div className={classes.content}>
                        {props.children}
                    </div>
            )}
                </OutsideAlerter>
        </div>
    )
}

export default SmallShow