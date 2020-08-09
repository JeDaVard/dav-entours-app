import React, {useEffect, useState} from 'react';
import classes from "./PaymentForm.module.css";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading";
import {PaymentRequestButtonElement, useStripe} from "@stripe/react-stripe-js";

export function ApplePay(props) {
    const { amount, intentPayment, loading, setLoading } = props;

    const [paymentRequest, setPaymentRequest] = useState(null);
    const stripe = useStripe();

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total price',
                    amount
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });
            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stripe]);

    useEffect(() => {
        if (paymentRequest) {
            paymentRequest.on('paymentmethod', async (ev) => {
                setLoading(p => ({...p, apple: true}));

                const response = await intentPayment();
                const { clientSecret } = response.data.intentTourPayment;
                const {error: confirmError} = await stripe.confirmCardPayment(
                    clientSecret,
                    {payment_method: ev.paymentMethod.id},
                    {handleActions: false}
                );

                if (confirmError) {
                    ev.complete('fail');
                    setLoading(p => ({
                        ...p,
                        apple: false,
                        message: confirmError.message || 'There was some issue, please try again, or try Entours payments method'
                    }))
                } else {
                    ev.complete('success');

                    const {
                        error,
                        // paymentIntent
                    } = await stripe.confirmCardPayment(clientSecret);

                    if (error) {
                        setLoading(p => ({
                            ...p,
                            apple: false,
                            message: error.message || 'There was some issue, please try again, or try Entours payments method'
                        }))
                    } else {
                        setLoading(p => ({
                            ...p,
                            apple: false,
                            message: 'Congratulations! You bought it, and now you will be redirected'
                        }))
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentRequest]);

    const options = {
        paymentRequest,
        style: {
            paymentRequestButton: {
                type: 'default',
                theme: 'dark',
                height: '40px',
            },
        }
    }

    return (
        <>
            {paymentRequest && ( loading.apple
                ?   <button className={`${classes.entoursPay} ${classes.applePayLoading}`} disabled={true}>
                        <div style={{opacity: '0'}}>
                            <span hidden={false} className={classes.pay}>Loading...</span>
                        </div>
                        <ButtonLoading />
                    </button>
                :   <PaymentRequestButtonElement options={options} />)}
        </>
    )
}