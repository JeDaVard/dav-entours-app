import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Pay from "./Pay";
import Modal from "../../components/UI/Modal/Modal";

function Payment() {
    const history = useHistory();
    const { location } = history

    const [ payment, setPayment ] = useState(location.state)

    // if (!payment) history.replace(`/payments/book` + location.search)

    useEffect(() => {
        if (!!location.state && !payment) setPayment(location.state)
    }, [location.state])

    return (
        <Modal
            onClick={() => {
                setPayment(false)
            }}
            showBackdrop={!!payment}
            title={'Entours Secure Payments'}
        >
            <div>
                <Pay />
            </div>
        </Modal>
    )
}

export default Payment