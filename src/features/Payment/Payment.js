import React, {useEffect, useState} from "react";
import { useHistory, Redirect } from 'react-router-dom';
import Pay from "./Pay";
import Modal from "../../components/UI/Modal/Modal";

function Payment() {
    const history = useHistory();
    const  { location } = history;

    const [ payment, setPayment ] = useState(location.state)

    useEffect(() => {
        if (!!location.state && !payment) setPayment(location.state)
    }, [location.state])

    if (!location.state)  return <Redirect to={'/payments/book'+location.search} />

    return (
        <Modal
            onClick={() => {
                setPayment(false)
            }}
            showBackdrop={!!payment}
            title={'Entours Secure Payments'}
        >
            <div>
                <h2>Pay</h2>
                <Pay />
            </div>
        </Modal>
    )
}

export default Payment