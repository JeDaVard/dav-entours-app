import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY);

export default function Pay() {
console.log(stripePromise, 'asdasssssssssssssssssssssssssssssssssd')
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}