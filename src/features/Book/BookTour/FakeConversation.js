import React from "react";
import classes from "./FakeConversation.module.css";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";

export default function FakeConversation(props) {
    const { one, second, setMessage } = props;
    return (
        <>
            <div className={classes.oneWelcome}>
                <div className={classes.onePhotoFrame}>
                    <UserAvatar src={one.photo}
                                className={classes.onePhoto}
                                alt={one.name}/>
                </div>
                <div className={classes.message}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum illo omnis repellat tenetur voluptate? At delectus, dolore ducimus eligendi eos et eveniet maxime molestias nam, perferendis quae quasi sed tenetur?</p>
                </div>
            </div>
            <div className={classes.secondHello}>
                <div className={classes.onePhotoFrame}>
                    <UserAvatar src={second.photo}
                                className={classes.onePhoto}
                                alt={second.name}/>
                </div>
                <textarea
                    onChange={e => { const value = e.target.value; setMessage(value)}}
                    rows={'4'}
                    placeholder={`Hello! I am ${second.name}. I can't wait to join you ...`}
                    className={`${classes.message} ${classes.secondMessage}`}/>
            </div>
        </>
    )
}