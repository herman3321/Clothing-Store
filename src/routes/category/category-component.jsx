import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, Fragment } from 'react'

import './category.style.scss'

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
            <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
        {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)
        }
    </div>
        </Fragment>
)
}

export default Category