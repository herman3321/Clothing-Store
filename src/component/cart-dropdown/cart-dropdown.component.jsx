import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../context/cart.context'

import { Button } from '../Button/button.style'

import './cart-dropdown.style.jsx'
import { CartDropdownContainer,
         CartItems,
         EmptyMessage } from './cart-dropdown.style.jsx'

import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () =>{
        navigate('/checkout')
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                (cartItems.map ((item) =>( 
                    <CartItem key={item.id} cartItem={item}/> )                  
                )) :
                <EmptyMessage>Empty Cart</EmptyMessage>
            }                
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown