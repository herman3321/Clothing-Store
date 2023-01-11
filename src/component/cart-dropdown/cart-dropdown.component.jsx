import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartItems } from '../../store/cart/cart.selector'

import  Button  from '../Button/button.component'

import { CartDropdownContainer,
         CartItems,
         EmptyMessage } from './cart-dropdown.style'

import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
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