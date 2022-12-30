import { useContext } from 'react'

import { CartContext } from '../context/cart.context'

import { CheckoutItemContainer,
         ImageContainer,
         Name,
         Quantity,
         Price,
         RemoveButton } from './checkout-item.style.jsx'

import './checkout-item.style.jsx'

const CheckoutItem = ({cartItem}) => {
    const { name ,imageUrl, price, quantity} = cartItem
    
    const {clearItemFromCart} = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name> {name} </Name>
            <Quantity>{quantity}</Quantity>
            <Price>{price}$</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
    
}

export default CheckoutItem