  import { useDispatch, useSelector } from 'react-redux'

  import { selectCartItems } from '../../store/cart/cart.selector'
  import { addItemToCart } from '../../store/cart/cart.action'
  
  import  { ProductCardContainer,
            FooterDetails,
            ProductName,
            ProductPrice } from './product-card.style'
  import Button, { BUTTON_TYPE_CLASSES } from '../Button/button.component'


  const  ProductCard = ({product}) =>{
    const {name, price, imageUrl} = product
    const dispatch = useDispatch() 
    const cartItems = useSelector(selectCartItems)
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return (
    <ProductCardContainer>
        <img src={imageUrl} alt={`${name}`}/>
        <FooterDetails>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price}$</ProductPrice>
        </FooterDetails>
        <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}>
        Add to card
      </Button>   
    </ProductCardContainer>
    )}

  export default ProductCard