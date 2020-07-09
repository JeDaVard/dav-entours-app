import React from "react";
import classes from "./TourParticipants.module.css";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Separator from "../../../components/UI/Separator/Separator";
import {Form, Input, MultiInput} from "../../../components/UI/LabeledInput/LabeledInput";
import ShowAllMembers from "../../TourContainer/TourOrder/ShowAllMembers";
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";

export default function (props) {
    const { me, start } = props;

    return (
        <div className={classes.participants}>
            <div className={classes.addGuest}>
                <SmallShow
                    handler={(trigger, opposite) => trigger(!opposite)}
                    button={(
                        <div className={classes.invite}>
                            <Justicon
                                className={classes.inviteIcon}
                                icon={'plus'} />
                        </div>
                    )}>
                    <div className={classes.inviteBlock}>
                        <div className={classes.inviteHead}>
                            <h2>Invite a member</h2>
                        </div>
                        <Separator color={'normal'} margin={'0 2'} />
                        <Form>
                            <MultiInput>
                                <Input
                                    type='email'
                                    name="guestEmail"
                                    label="E-mail"
                                    id="inviteGuestEmail"
                                    // value={state.summary}
                                    // onChange={onInputChange}
                                    inputDescription="Come with your friend or family member,
                                                    just add their account and pay"
                                />
                                <button className={classes.add}>
                                    <Justicon
                                        className={`${classes.inviteIcon} ${classes.adInviteIcon}`}
                                        icon={'plus'} />
                                </button>
                            </MultiInput>
                        </Form>
                    </div>
                </SmallShow>
                <img src={process.env.REACT_APP_SERVER+'/images/user/'+me.photo}
                     alt={me.name}
                     className={classes.user}/>
            </div>
            <div className={classes.members}>
                {start.participants.slice(0,5).map(p => (
                    <img src={process.env.REACT_APP_SERVER+'/images/user/'+p.photo}
                         key={p._id}
                         alt={p.name}
                         className={classes.user}/>
                ))}
                <ShowAllMembers start={start} />
            </div>
        </div>
    )
}