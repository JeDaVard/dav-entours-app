import React, {useState} from "react";
import classes from './TourOrder.module.css';
import Modal from "../../UI/Modal/Modal";
import PopDown from "../PopDown/PopDown";
import moment from 'moment'

export default function TourOrder(props) {
    const [ state, setState ] = useState(true);

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
                {props.tour.starts.map(date => {
                    return (
                        <div key={date.date}>
                            <p>{moment(+date.date).format('dd DD MMM YYYY')}</p>
                            <div></div>
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