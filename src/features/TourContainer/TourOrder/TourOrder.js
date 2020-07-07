import React, {useState} from "react";
import classes from './TourOrder.module.css';
import Modal from "../../../components/UI/Modal/Modal";
import PopDown from "../PopDown/PopDown";
import moment from 'moment'
import SimpleButton from "../../../components/UI/SimpleButton/SimpleButton";
import {Link} from "react-router-dom";
import Separator from "../../../components/UI/Separator/Separator";
import LocLink from "../../../components/UI/LocLink/LocLink";
import ShowAllMembers from "./ShowAllMembers";

export default function TourOrder(props) {
    const [ state, setState ] = useState(false);

    const reserveHandler = e => {
        setState(true)
    }

    return (
        <>
            <Modal
                onClick={() => setState(false)}
                showBackdrop={state}
                title={'Book the tour'}
            >
                {props.tour.starts.map(start => {
                    return (
                        <div key={start.date} className={classes.block}>
                            <p className={classes.date}>{moment(+start.date).format('dd, DD MMM')}</p>
                            <div className={classes.body}>
                                <div className={classes.top}>
                                    <div className={classes.main}>
                                        <h2 className={classes.time}>Start at {moment(+start.date).format('ddd, hh:mm A')}</h2>
                                        <p className={classes.price}><b>${props.tour.price}</b> per person</p>
                                    </div>
                                    <div className={classes.buttonBlock}>
                                        <SimpleButton
                                            black
                                            to={`/book?tourId=${props.tour._id}&slug=${props.tour.slug}&start=${start._id}&date=${start.date}`}>
                                            Choose
                                        </SimpleButton>
                                    </div>
                                </div>
                                <Separator />
                                <div className={classes.bottom}>
                                    <div className={classes.participants}>
                                        {start.participants.slice(0,3).map(participant => (
                                            <Link to={`/user/${participant._id}`}
                                                  className={classes.participantLink}
                                                  key={participant._id}
                                            >
                                                <img src={`${process.env.REACT_APP_SERVER}/images/user/${participant.photo}`}
                                                     className={classes.photo}
                                                     alt={participant.name}/>
                                            </Link>
                                        ))}
                                    <ShowAllMembers start={start} />
                                    </div>
                                        <LocLink
                                            coordinates={props.tour.locations[0].coordinates}
                                            address={props.tour.locations[0].address.slice(0, 16) + ' ...'}
                                        />
                                </div>
                            </div>
                        </div>
                    )
                })}
        </Modal>
            <PopDown
                onReserve={reserveHandler}
                tour={props.tour}
            />
        </>
    )
}