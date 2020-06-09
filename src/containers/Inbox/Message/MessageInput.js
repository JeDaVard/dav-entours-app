import React from "react";
import classes from './MessageInput.module.css';
import Justicon from "../../../components/UI/Justicon";

function MessageInput() {
    return (
        <div className={classes.MessageInput}>
            <div className={classes.MessageInput__sendPhoto}>
                <Justicon icon={'camera'} className={classes.MessageInput__sendPhotoIcon} />
            </div>
            <form onSubmit={() => {}} className={classes.MessageInput__form}>
                <input type="text" placeholder={'Text'} className={classes.MessageInput__input}/>
                <button type={'submit'} className={classes.MessageInput__send}>
                    <Justicon icon={'send'} className={classes.MessageInput__sendIcon} />
                </button>
            </form>
            {/*<div className={classes.MessageInput__sendPhoto}>*/}
            {/*    <Justicon icon={'send'} className={classes.MessageInput__sendPhotoIcon} />*/}
            {/*</div>*/}
        </div>
    )
}

export default MessageInput