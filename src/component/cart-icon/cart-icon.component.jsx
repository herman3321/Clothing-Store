import { useDispatch, useSelector } from 'react-redux'

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg' 

import { CartIconContainer,
         ShopIcon,
         ItemCount } from './cart-icon.style'


const CartIcon = () =>{
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShopIcon>
            <ShoppingIcon/>
            </ShopIcon>
            
            <ItemCount>{cartCount}</ItemCount>

        </CartIconContainer>
    )}

export default CartIcon