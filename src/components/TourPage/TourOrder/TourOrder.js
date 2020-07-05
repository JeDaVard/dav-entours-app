import React, {useState} from "react";
import classes from './TourOrder.module.css';
import Modal from "../../UI/Modal/Modal";
import PopDown from "../PopDown/PopDown";

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
                title={'title'}
            >
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
                <div>dfghjk</div>
            </Modal>
            <PopDown
                onReserve={reserveHandler}
                tour={props.tour}
            />
        </>
    )
}