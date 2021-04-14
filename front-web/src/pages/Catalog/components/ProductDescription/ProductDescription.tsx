import { Link, useParams } from 'react-router-dom';
import './style.scss'
import {ReactComponent as ArrowImage} from '../../../../core/assets/images/arrow.svg'
import {ReactComponent as ProductImage} from '../../../../core/assets/images/catalog-product.svg'
import ProductPrice from '../../../../core/components/ProductPrice';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../../core/utils/requests';
import { Product } from '../../../../core/types/Product';

type Params = {
    productId: string;
}

const ProductDescription = () => {
    // let id = useParams<Params>();
    const {productId} = useParams<Params>();
    const [product,setProduct] = useState<Product>();
    //alert(id.productId);


    useEffect(() => {
        makeRequest({url: `/products/${productId}`})
        .then(r => setProduct(r.data))
    },[productId])

    //console.log(product)
        
    return (<div className="product-details-container">
        <div className="card-base border-radius-20 product-details">
            <Link to="/products" className="details-goback">
                <ArrowImage className="icon-goback"/>
                <h1 className="text-goback">VOLTAR</h1>
            </Link>
            <div className="row">
                <div className="col-6 pr-5">
                    <div className="product-details-card text-center">
                        <img src={product?.imgUrl} alt={product?.name} className="product-details-image"/>
                    </div>
                    <h1 className="product-details-image-title">{product?.name}</h1>
                    {product?.price && <ProductPrice price={product?.price}/>}
                </div>
                <div className="col-6 product-details-card">
                    <h1 className="product-description-title">Descrição do produto</h1>
                    <p className="product-description-text">
                        {product?.description}
                    </p>
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDescription