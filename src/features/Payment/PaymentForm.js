import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import qs from "query-string";
import classes from "./PaymentForm.module.css";
import { CardElement, useElements, useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/client";
import {INTENT_PAYMENT} from "./queries";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading";
import locker from "../../assets/icons/locker.svg";
import './_payments.css'
import Separator from "../../components/UI/Separator/Separator";

export default function PaymentForm() {
    const location = useLocation()
    const { tourId, start, invite } = qs.parse(location.search);
    const { message, me } = location.state;

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
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: 1099,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const response = await intentPayment();
        console.log(response)
        const { clientSecret } = response.data.intentTourPayment;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: me.name,
                },
            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log(result)
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };

    return (
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
                <StyledButton disabled={!stripe}>
                    <div style={{opacity: stripe ? '1' : '0'}}>
                        <img hidden={false} src={locker} className={classes.payIcon}  alt="secure"/>
                        <span hidden={false} className={classes.pay}>Pay</span>
                    </div>
                    {!stripe && <ButtonLoading />}
                </StyledButton>
                {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
            </div>
            <div className={classes.otherMethods}>
            </div>
        </form>
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