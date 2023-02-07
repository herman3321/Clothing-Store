import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { json } from "react-router-dom";

import Button, { BUTTON_TYPE_CLASSES } from "../Button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.style";



const PaymentForm = () =>{
    const stripe = useStripe()
    const elements = useElements()

    const paymentHandler = async (e) =>{
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: json.strify({ amount: 10000})
        }).then(res => res.json())

        const {paymentIntent: { client_secret }} = response 
         
        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details:{
                    name: 'herman'
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
            <Button  buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Pay now
            </Button>
            </FormContainer> 
        </PaymentFormContainer>
    )
}

export default PaymentForm