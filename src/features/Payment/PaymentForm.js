import React from 'react';
import classes from "./PaymentForm.module.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import {useMutation} from "@apollo/react-hooks";
import {INTENT_PAYMENT} from "./queries";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading";
import locker from "../../assets/icons/locker.svg";
import './_payments.css'

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [ intentPayment ] = useMutation(INTENT_PAYMENT);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { data } = await intentPayment();
        const { clientSecret } = data.intentPayment;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
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
        <div className="StripeElement">

            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </label>
                <div className={classes.payButton}>
                    <StyledButton disabled={!stripe}>
                        <img hidden={false} src={locker} className={classes.payIcon}  alt="secure"/>
                        <span hidden={false}>Confirm and Pay</span>
                        {!stripe && <ButtonLoading />}
                    </StyledButton>
                </div>
            </form>
        </div>
    )
}

const CARD_ELEMENT_OPTIONS = {
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