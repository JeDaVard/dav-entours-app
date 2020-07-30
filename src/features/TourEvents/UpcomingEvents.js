import React, { useState } from 'react';
import classes from './UpcomingEvents.module.css';
import UpcomingEvent from "./UpcomingEvent";
import { useMutation } from "@apollo/client";
import Modal from "../../components/UI/Modal/Modal";
import SimpleButton from "../../components/UI/SimpleButton/SimpleButton";
import {CANCEL_ORDER, FETCH_CURRENT_ORDERS} from "./queries";
import DotLoading from "../../components/UI/DotLoading/DotLoading";


function UpcomingEvents(props) {
    const { orders } = props;
    const [ cancelItem, setCancelItem ] = useState(null)

    const [ cancelOrder, { loading } ] = useMutation(CANCEL_ORDER, {
        update(cache, res ) {
            const { me } = cache.readQuery({query: FETCH_CURRENT_ORDERS})
            cache.writeQuery({
                query: FETCH_CURRENT_ORDERS,
                data: { me: {
                        ...me,
                        orders: res.data.cancelOrder.data
                    }
                }
            })
        }
    })

    const cancelHandler = (id) => {
        cancelOrder({
            variables: {
                id
            }
        }).then(() => {
            setCancelItem(null)
        })
    }

    return (
        <div className={classes.content}>
            <Modal
                onClick={() => setCancelItem(false)}
                showBackdrop={!!cancelItem}
                title={'Order Cancellation'}
            >
                <div className={classes.cancelBlock}>
                    {loading && <DotLoading />}
                    <h2>Are you sure?</h2>
                    <p className={classes.cancelText}>You will receive receive a refund by our <b>Cancellation Policy</b></p>
                    <p className={classes.cancelPolicy}>
                        By selecting the button below, I agree to all rules, Cancellation Policy,
                        and the Refund Policy.
                    </p>
                    {!loading ? (
                        <div className={classes.button}>
                            <SimpleButton onClick={() => cancelHandler(cancelItem)}>
                                Yes, Cancel
                            </SimpleButton>
                            <SimpleButton white onClick={() => setCancelItem(false)}>
                                Close
                            </SimpleButton>
                        </div>
                    ) : (
                        <h2 className={classes.wait} >Please wait...</h2>
                    )}
                </div>
            </Modal>
            {orders.map(order => (
                <UpcomingEvent order={order} key={order._id} setCancelItem={setCancelItem} />
            ))}
        </div>
    );
}

export default UpcomingEvents;
