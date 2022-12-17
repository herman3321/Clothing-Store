  import { useContext } from 'react'

  import { CartContext } from '../context/cart.context'
  
  import  { ProductCardContainer,
            FooterDetails,
            ProductName,
            ProductPrice } from './product-card.style'
  import Button, { BUTTON_TYPE_CLASSES } from '../Button/button.component'


  const  ProductCard = ({product}) =>{
    const {name, price, imageUrl} = product
    const { addItemToCart} = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product);

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