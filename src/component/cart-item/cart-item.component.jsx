import { CartItemContainer,
         ItemDetails
        } from './cart-item.style'

const CartItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem
    return(
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
            <h2>{name}</h2>
            <span>{quantity} x {price}$</span>
            </ItemDetails>
        </CartItemContainer>
    )
     
}

export default CartItem