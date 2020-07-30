import React, {useRef, useState} from 'react';
import classes from './UpcomingEvents.module.css';
import UpcomingEvent from "./UpcomingEvent";
import {useMutation} from "@apollo/client";
import Modal from "../../components/UI/Modal/Modal";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import {CANCEL_ORDER} from "./queries";


function UpcomingEvents(props) {
    const { orders } = props;
    const [ cancelItem, setCancelItem ] = useState(null)

    const [ cancelOrder ] = useMutation(CANCEL_ORDER)

    const cancelHandler = (id) => {
        cancelOrder({
            variables: {
                id
            }
        })
    }

    return (
        <div className={classes.content}>
            <Modal
                onClick={() => setCancelItem(false)}
                showBackdrop={cancelItem}
                title={'Order Cancellation'}
            >
                <div>
                    <SimpleButton onClick={() => cancelHandler(cancelItem)}>
                        Cancel
                    </SimpleButton>
                </div>
            </Modal>
            {orders.map(order => (
                <UpcomingEvent order={order} key={order._id} setCancelItem={setCancelItem} />
            ))}
        </div>
    );
}

export default UpcomingEvents;
