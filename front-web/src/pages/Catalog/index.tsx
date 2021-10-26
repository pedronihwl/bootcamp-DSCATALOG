import './style.scss'
import ProductCard from './components/ProductCard/ProductCard'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { makeRequest } from 'core/utils/requests'
import { Category, ContentResponse } from 'core/types/Product'
import ProductCardLoader from './components/Loaders/ProductCardLoader'
import Pagination from 'core/components/Pagination'
import ProductFilter from 'core/components/ProductFilter'

const Catalog = () => {

    const [contentResponse, setContentResponse] = useState<ContentResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const [name, setName] = useState('')
    const [category, setCategory] = useState<Category>()

    const clearFields = () => {
        setActivePage(0)
        setCategory(undefined)
        setName('')
    }

    const handleChangeName = (name: string) => {
        setActivePage(0)
        setName(name)
    }

    const handleChangeCat = (category: Category) => {
        setActivePage(0)
        setCategory(category)
    }

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            size: 12,
            categoryId: category?.id,
            name
        }
        setIsLoading(true);
        makeRequest({url: '/products', params,})
        .then(r => setContentResponse(r.data)).finally(() => {
            setIsLoading(false);
        })

    },[activePage, name, category])

    useEffect(() => {
        getProducts();
    },[getProducts])

    
    return (<div className="catalog-container">
        <div className="filter-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <ProductFilter 
            handleChangeCat={handleChangeCat}
            handleChangeName={handleChangeName}
            clearFields={clearFields}
            name={name}
            category={category}
            />
        </div>
        <div className="catalog-products">
            {isLoading ? <ProductCardLoader/> : contentResponse?.content.map(p => (
                <Link to={`/products/${p.id}`} key={p.id}>
                    <ProductCard product={p}/>
                </Link>
            ))}
        
        </div>
        {contentResponse && <Pagination totalPages={contentResponse?.totalPages} activePage={activePage} 
        // (A função é declarada aqui) 'page' é o parâmetro da função. A função serve para chamar o setActivePage
        onChange={page => setActivePage(page)} />}
    </div>)
}

export default Catalog
