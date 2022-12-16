import { useContext } from 'react'

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg' 

import { CartContext } from '../context/cart.context'

import { CartIconContainer,
         ShopIcon,
         ItemCount } from './cart-icon.style'


const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen, cartCounter} = useContext(CartContext)
    
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShopIcon>
            <ShoppingIcon/>
            </ShopIcon>
            
            <ItemCount>{cartCounter}</ItemCount>

        </CartIconContainer>
    )}

export default CartIcon