import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import classes from "./TourParticipants.module.css";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Separator from "../../../components/UI/Separator/Separator";
import {Form, Input, MultiInput} from "../../../components/UI/LabeledInput/LabeledInput";
import ShowAllMembers from "../../TourContainer/TourOrder/ShowAllMembers";
import { useMutation } from "@apollo/react-hooks";
import {FETCH_ADDED_MEMBER} from "./queries";
import RoundLoading from "../../../components/UI/RoundLoading/RoundLoading";


export default function (props) {
    const { me, start, setPrice, query, singlePrice } = props;
    const history = useHistory()

    const [ input, setInput ] = useState({
        inviteEmail: '',
        inviteUsers: []
    })
    const [ addMember, { loading } ] = useMutation(FETCH_ADDED_MEMBER, {
        variables: {
            email: input.inviteEmail
        },
        onCompleted: data => {
            const newUsers = [data.inviteUser, ...input.inviteUsers]
            setInput(p => ({
                ...p,
                inviteUsers: newUsers
            }))
        }
    });

    useEffect(() => {
        const queryUsers = input.inviteUsers.map(user => user._id);

        history.replace({
            pathname: history.location.pathname,
            search: input.inviteUsers.length ? query + `&invite=${queryUsers.toString()}` : query
        });

        setPrice(singlePrice * (input.inviteUsers.length+1));

    }, [input.inviteUsers.length])

    const removeInvited = (e, id) => {
        const newUsers = input.inviteUsers.filter(user => user._id !== id);
        setInput(p => ({...p, inviteUsers: newUsers}))
    }

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
                                    value={input.inviteEmail}
                                    onChange={e => {
                                        const value = e.target.value
                                        setInput(p => ({...p, inviteEmail: value}))
                                    }}
                                    inputDescription="Come with your friend or family member,
                                                    just add their account and pay"
                                />
                                <button disabled={loading} className={classes.add} onClick={e => {
                                    e.preventDefault();
                                    addMember().then(() => {
                                        setInput(p => ({...p, inviteEmail: ''}))
                                    })
                                }}>
                                    {loading ? <RoundLoading /> : <Justicon
                                        className={`${classes.inviteIcon} ${classes.adInviteIcon}`}
                                        icon={'plus'} />}
                                </button>
                            </MultiInput>
                        </Form>
                    </div>
                </SmallShow>
                {input.inviteUsers.map(p => (
                    <div className={classes.invitedUser} key={p._id}>
                        <img src={process.env.REACT_APP_SERVER+'/images/user/'+p.photo}
                             alt={p.name}
                             className={classes.inviteUserImage}
                        />
                        <button className={classes.invitedUserRemove} onClick={e => removeInvited(e, p._id)}>
                        <Justicon icon={'trash'} className={classes.invitedUserRemoveIcon}/>
                        </button>
                    </div>
                ))}
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