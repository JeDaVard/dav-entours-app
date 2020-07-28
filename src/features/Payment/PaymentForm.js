import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import qs from "query-string";
import classes from "./PaymentForm.module.css";
import { CardElement, useElements, useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
// import StyledButton from "../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/client";
import {INTENT_PAYMENT} from "./queries";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading";
import locker from "../../assets/icons/locker.svg";
import './_payments.css'
import Top from "../MainPage/Top/Top";
import TopLoading from "../../components/UI/TopLoading/TopLoading";
import DotLoading from "../../components/UI/DotLoading/DotLoading";
// import Separator from "../../components/UI/Separator/Separator";

export default function PaymentForm() {
    const history = useHistory();
    const { location } = history;

    const { tourId, start, invite = '' } = qs.parse(location.search);
    const { message, me, price = 0 } = location.state;
    const [ loading, setLoading ] = useState({
        card: false,
        apple: false,
        message: ''
    })

    const toyPrice = ((price + (invite.split(',').length * price))
        + ((price + (invite.split(',').length * price)) * +process.env.REACT_APP_FEE / 100)) * 100;
console.log(toyPrice)
    const [paymentRequest, setPaymentRequest] = useState(null);

    const stripe = useStripe();
    const elements = useElements();
    const [ intentPayment ] = useMutation(INTENT_PAYMENT, {
        variables: {
            tourId,
            startId: start,
            firstMessage: message,
            invitedIds: invite
        },
    });

    useEffect(() => {
        if (loading.message.startsWith('Congratulations')) {
            setTimeout(() => history.push('/'), 3000)
        }
    }, [loading.message])

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: toyPrice || 0
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
    }, [stripe]);

    useEffect(() => {
        if (paymentRequest) {
            paymentRequest.on('paymentmethod', async (ev) => {
                setLoading(p => ({...p, apple: true}))
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
    }, [paymentRequest])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setLoading(p => ({...p, card: true}))

        const response = await intentPayment();
        const { clientSecret } = response.data.intentTourPayment;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: me.email,
                },
            }
        });

        if (result.error) {
            setLoading(p => ({...p, card: false, message: result.error.message}))
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setLoading(p => ({
                    ...p,
                    card: false,
                    message: 'Congratulations! You bought it, and now you will be redirected'
                }))
            }
        }
    };

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
            {!loading.message.startsWith('Congratulations')
                ? (
                <div className={classes.loading}>
                    <DotLoading />
                </div>
            ) : (
                <div className={classes.entoursMethod}>
                    <form onSubmit={handleSubmit}>
                        <div className="heading">
                            <h2 className="entoursPay">Entours Pay</h2>
                            <h3 className="name">{me.name}</h3>
                        </div>
                        <div className="card">
                            <div className="cardDetails">
                                <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </div>
                        </div>
                        <div className={classes.payButton}>
                            <button className={classes.entoursPay} disabled={!stripe || loading.card}>
                                <div style={{opacity: (!loading.card || !stripe) ? '1' : '0'}}>
                                    <img src={locker} className={classes.payIcon}  alt="secure"/>
                                    <span className={classes.pay}>Pay</span>
                                </div>
                                {(!stripe || loading.card) && <ButtonLoading />}
                            </button>
                            {paymentRequest && ( loading.apple
                                ?   <button className={`${classes.entoursPay} ${classes.applePayLoading}`} disabled={true}>
                                    <div style={{opacity: '0'}}>
                                        <span hidden={false} className={classes.pay}>Loading...</span>
                                    </div>
                                    <ButtonLoading />
                                </button>
                                :   <PaymentRequestButtonElement options={options} />)}
                        </div>
                    </form>
                </div>
            )}
            {!!loading.message.length && (
            <div className={`${classes.paymentError} ${loading.message.startsWith('Congratulations') ? classes.paymentResult : ''}`}>
                <div className={classes.paymentMessage}>
                    <p>{loading.message}</p>
                </div>
            </div>
                )}
        </>
    )
}

const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};