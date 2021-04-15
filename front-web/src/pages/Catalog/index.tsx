import './style.scss'
import ProductCard from './components/ProductCard/ProductCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { makeRequest } from 'core/utils/requests'
import { ContentResponse } from 'core/types/Product'
import ProductCardLoader from './components/Loaders/ProductCardLoader'

const Catalog = () => {

    const [contentResponse, setContentResponse] = useState<ContentResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = {
            page: 0,
            lines: 12
        }
        setIsLoading(true);
        makeRequest({url: '/products', params})
        .then(r => setContentResponse(r.data)).finally(() => {
            setIsLoading(false);
        })
    },[])

    
    return (<div className="catalog-container">
        <h1 className="catalog-title">Catálogo de produtos</h1>
        <div className="catalog-products">
            {isLoading ? <ProductCardLoader/> : contentResponse?.content.map(p => (
                <Link to={`/products/${p.id}`} key={p.id}>
                    <ProductCard product={p}/>
                </Link>
            ))}
        </div>
    </div>)
}

export default Catalog
