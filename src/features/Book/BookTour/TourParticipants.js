import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import classes from "./TourParticipants.module.css";
import ShowAllMembers from "../../TourContainer/TourOrder/ShowAllMembers";
import UserAvatar from "../../../components/UI/UserAvatar/UserAvatar";
import InviteUser from "../InviteUser";


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

    useEffect(() => {
        const queryUsers = input.inviteUsers.map(user => user._id);

        history.replace({
            pathname: history.location.pathname,
            search: input.inviteUsers.length ? query + `&invite=${queryUsers.toString()}` : query
        });

        setPrice(singlePrice * (input.inviteUsers.length+1));
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input.inviteUsers.length])

    return (
        <div className={classes.participants}>
            <InviteUser adding={{show, setShow}}
                        inputDescription="Come with your friend or family member, just add their account and pay"
                        title="Invite a member"
                        data={{input, setInput}}
                        author={{name, photo}}/>
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