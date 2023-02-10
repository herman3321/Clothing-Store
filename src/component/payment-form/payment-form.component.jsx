import { useState } from 'react'

import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector'

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; 

import Button, { BUTTON_TYPE_CLASSES } from "../Button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.style";



const PaymentForm = () =>{
    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false)


    const paymentHandler = async (e) =>{
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        setIsProcessingPayment(false)

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100}) 
        }).then((res) => res.json())

        const {paymentIntent: { client_secret }} = response 
         
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details:{
                    name: currentUser ? currentUser.displayName : 'userGuest'
                }
            }
        })

        if (paymentResult.error){
            alert(paymentResult.error)
        }
        else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment successful')
            }
        }

    }

    return(
        <PaymentFormContainer>
           <FormContainer onSubmit={paymentHandler}>
            <h1>Credit Card Payment: </h1>
            <CardElement />
            <br/>
            <Button 
             isLoading={isProcessingPayment}
             buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Pay now
            </Button>
            </FormContainer> 
        </PaymentFormContainer>
    )
}

export default PaymentForm