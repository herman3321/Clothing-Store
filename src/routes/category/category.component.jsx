import { useParams } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import {  useSelector } from 'react-redux'

import { CategoryContainer,CategoryTitle } from './category.style'

import ProductCard from '../../component/product-card/product-card.component'
import Spinner from '../../component/spinner/spinner.component'

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'

const Category =() =>{
    const {category} = useParams()
    const  categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [ products, setProducts] = useState(categoriesMap[category])
    
    useEffect(() =>{
        setProducts(categoriesMap[category])

    }, [category, categoriesMap])
    return(
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (
                <Spinner/>
            ): (
                <CategoryContainer>
                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
            )}
        </Fragment>
)
}
export default Category