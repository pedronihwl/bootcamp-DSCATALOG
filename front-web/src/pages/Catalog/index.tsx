import './style.scss'
import ProductCard from './components/ProductCard/ProductCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { makeRequest } from 'core/utils/requests'
import { ContentResponse } from 'core/types/Product'
import ProductCardLoader from './components/Loaders/ProductCardLoader'
import Pagination from 'core/components/Pagination'

const Catalog = () => {

    const [contentResponse, setContentResponse] = useState<ContentResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            lines: 12
        
        }
        setIsLoading(true);
        makeRequest({url: '/products', params,})
        .then(r => setContentResponse(r.data)).finally(() => {
            setIsLoading(false);
        })
    },[activePage])

    
    return (<div className="catalog-container">
        <h1 className="catalog-title">Catálogo de produtos</h1>
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
