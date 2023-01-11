import { useSelector } from 'react-redux'

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

import CheckoutItem from '../../component/checkout-item/check-item.component'


import { ChechoutContainer,
         CheckoutHeader,
         HeaderBlock,
         Total } from './checkout.style'
const Checkout =() => {

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    return(
        <ChechoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock className="header-block">
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock className="header-block">
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock className="header-block">
                    <span>Price</span>
                </HeaderBlock>

                <HeaderBlock className="header-block">
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader> 
            {
                cartItems.map((cartItem)=>(                    
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
            }
            <Total>Total ${cartTotal}</Total>
        </ChechoutContainer>
    )
}


export default Checkout