import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, Fragment } from 'react'

import { CategoryContainer,CategoryTitle } from './category.style'

import ProductCard from '../../component/product-card/product-card.component'
import { CategoriesContext } from '../../component/context/Categories.context'

const Category =() =>{
    const {category} = useParams()
    const { categoriesMap} = useContext(CategoriesContext)
    const [ products, setProducts] = useState(categoriesMap[category])

    useEffect(() =>{
        setProducts(categoriesMap[category])

    }, [category, categoriesMap])
    return(
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
        {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)
        }
    </CategoryContainer>
        </Fragment>
)
}

export default Category