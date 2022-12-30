  import { useContext } from 'react'

  import { CartContext } from '../context/cart.context'
  
  import { ProductCartContainer,
           Footer,
           Name,
           Price } from './product-card.style'
  import { Button } from '../Button/button.style'


  const  ProductCard = ({product}) =>{
    const {name, price, imageUrl} = product
    const { addItemToCart} = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product);

    return (
    <ProductCartContainer>
        <img src={imageUrl} alt={`${name}`}/>
        <Footer>
            <Name>{name}</Name>
            <Price>{price}$</Price>
        </Footer>
        <Button onClick={addProductToCart}>Add to cart </Button>   
    </ProductCartContainer>
    )}

  export default ProductCard