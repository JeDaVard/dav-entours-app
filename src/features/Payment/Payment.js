import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Pay from "./Pay";
import Modal from "../../components/UI/Modal/Modal";

function Payment() {
    const history = useHistory();
    const { location } = history

    const [ payment, setPayment ] = useState(location.state)

    const [ show, setShow ] = useState(false)

    useEffect(() => {
        if (!!location.state && !show) {
            new Promise(resolve => {
                    setTimeout(() => {
                        setShow(true)
                    }, 0)
                    resolve()
            })
        }
    }, [location.state])

    return (
        <div>
            <Modal
                onClick={() => {
                    setPayment(false)
                    history.push(`/payments/book` + location.search)
                }}
                showBackdrop={show}
                title={'Entours Secure Payments'}
            >
                <div>
                    <Pay />
                </div>
            </Modal>
        </div>
    )
}

export default Payment