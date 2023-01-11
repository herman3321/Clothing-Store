import ProductCard from '../product-card/product-card.component'

import { CategoryPreviewContainer,
         LinkTitle,
         Preview } from './category-preview.style'

const CategoryPreview =  ({ title, products}) => {
    return(
        <CategoryPreviewContainer>
            <h2>
                <LinkTitle className='title' to={title}>
                {title.toUpperCase()}
                </LinkTitle>
            </h2>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4)
                    .map((product) =>(
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview