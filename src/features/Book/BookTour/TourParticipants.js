import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import classes from "./TourParticipants.module.css";
import SmallShow from "../../../components/UI/SmallShow/SmallShow";
import Justicon from "../../../components/UI/JustIcon/Justicon";
import Separator from "../../../components/UI/Separator/Separator";
import { Form, Input, MultiInput } from "../../../components/UI/LabeledInput/LabeledInput";
import ShowAllMembers from "../../TourContainer/TourOrder/ShowAllMembers";
import { useMutation } from "@apollo/client";
import { FETCH_ADDED_MEMBER } from "./queries";
import RoundLoading from "../../../components/UI/RoundLoading/RoundLoading";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";


export default function (props) {
    const { start, setPrice, singlePrice } = props;
    const name = localStorage.getItem('name')
    const photo = localStorage.getItem('photo')

    const history = useHistory();
    const query = history.location.search.split('&invite')[0];

    const [ show, setShow ] = useState(false);
    const [ input, setInput ] = useState({
        inviteEmail: '',
        inviteUsers: [],
        error: null
    })
    const [ addMember, { loading } ] = useMutation(FETCH_ADDED_MEMBER, {
        variables: {
            email: input.inviteEmail
        },
        onCompleted: data => {
            if (!data.inviteUser.success) {
                return setInput(p => ({
                    ...p,
                    error: data.inviteUser.message,
                }))
            }
            const newUsers = [data.inviteUser.data, ...input.inviteUsers]
            setInput(p => ({
                ...p,
                inviteEmail: '',
                inviteUsers: newUsers,
                error: null
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
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input.inviteUsers.length])

    const removeInvited = (e, id) => {
        const newUsers = input.inviteUsers.filter(user => user._id !== id);
        setInput(p => ({...p, inviteUsers: newUsers}))
    }

    return (
        <div className={classes.participants}>
            <div className={classes.addGuest}>
                <SmallShow
                    showIn={[show, setShow]}
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
                        <Form onSubmit={e => {
                            e.preventDefault();
                            if (input.inviteEmail === '') {
                                return setInput(p => ({...p, error: 'Please, enter a valid account email'}))
                            }
                            addMember().then(d => {
                                if (d.data.inviteUser.success) setShow(false);
                            })
                        }}>
                            {input.error && (
                                <p className={classes.error}>{input.error}</p>
                            )}
                            <MultiInput>
                                <Input
                                    type="email"
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
                                {input.inviteEmail !== '' && (
                                    <button disabled={loading} className={classes.add} type="submit">
                                        {loading ? <RoundLoading /> : <Justicon
                                            className={`${classes.inviteIcon} ${classes.adInviteIcon}`}
                                            icon={'plus'} />}
                                    </button>
                                )}
                            </MultiInput>
                        </Form>
                    </div>
                </SmallShow>
                {input.inviteUsers.map(p => (
                    <div className={classes.invitedUser} key={p._id}>
                        <UserAvatar src={p.photo}
                             alt={p.name}
                             className={classes.inviteUserImage}
                        />
                        <button className={classes.invitedUserRemove} onClick={e => removeInvited(e, p._id)}>
                        <Justicon icon={'trash'} className={classes.invitedUserRemoveIcon}/>
                        </button>
                    </div>
                ))}
                    <UserAvatar src={photo}
                         alt={name}
                         className={classes.user}/>
            </div>
            <div className={classes.members}>
                {start.participants.slice(0,5).map(p => (
                    <UserAvatar src={p.photo}
                         key={p._id}
                         alt={p.name}
                         className={classes.user}/>
                ))}
                <ShowAllMembers start={start} />
            </div>
        </div>
    )
}