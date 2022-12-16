import { Route, Routes } from 'react-router-dom'
import { useContext, Fragment } from 'react'

import CategoryPreview from '../../component/category-preview/category-preview.component'
import Category from '../category/category-component'

import { CategoriesContext } from '../../component/context/Categories.context'



const CategoriesPreview = () => {
    const { categoriesMap} = useContext(CategoriesContext)
    
   return(
    <Fragment>
        {Object.keys(categoriesMap).map((title)=>{
            const products= categoriesMap[title]
            return(
                <CategoryPreview key={title} title={title} products={products}/>
            )
        })

        }
    </Fragment>
   )
   
}

export default CategoriesPreview