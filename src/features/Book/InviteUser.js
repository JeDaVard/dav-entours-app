import React from "react";
import classes from "./InviteUser.module.css";
import SmallShow from "../../components/UI/SmallShow/SmallShow";
import Justicon from "../../components/UI/JustIcon/Justicon";
import Separator from "../../components/UI/Separator/Separator";
import {Form, Input, MultiInput} from "../../components/UI/LabeledInput/LabeledInput";
import RoundLoading from "../../components/UI/RoundLoading/RoundLoading";
import UserAvatar from "../../components/UI/UserAvatar/UserAvatar";
import {useMutation} from "@apollo/client";
import {FETCH_ADDED_MEMBER} from "./queries";

function InviteUser(props) {
    const { name, photo } = props.author;
    const { input, setInput } = props.data;
    const { show, setShow } = props.adding
    const { inputDescription, title } = props;

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
            const inviteUsers = [data.inviteUser.data, ...input.inviteUsers]
            setInput(p => ({
                ...p,
                inviteEmail: '',
                inviteUsers,
                error: null
            }))
        }
    });

    const removeInvited = (e, id) => {
        const newUsers = input.inviteUsers.filter(user => user._id !== id);
        setInput(p => ({...p, inviteUsers: newUsers}))
    }

    return (
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
                        <h2>{title}</h2>
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
                        <div className={classes.input}>
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
                                inputDescription={inputDescription}
                            />
                            {input.inviteEmail !== '' && (
                                <button disabled={loading} className={classes.add} type="submit">
                                    {loading ? <RoundLoading /> : <Justicon
                                        className={`${classes.inviteIcon} ${classes.adInviteIcon}`}
                                        icon={'plus'} />}
                                </button>
                            )}
                        </div>
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
    )
}

export default InviteUser