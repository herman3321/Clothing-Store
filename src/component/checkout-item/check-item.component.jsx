import { useContext } from 'react'

import { CartContext } from '../context/cart.context'

import './checkout-item.style.scss'

const CheckoutItem = ({cartItem}) => {
    const { name ,imageUrl, price, quantity} = cartItem
    
    const {clearItemFromCart} = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>{price}$</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    )
    
}

export default CheckoutItem