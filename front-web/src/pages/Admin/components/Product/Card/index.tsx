import ProductPrice from 'core/components/ProductPrice'
import { Product } from 'core/types/Product'
import { Link } from 'react-router-dom'
import './style.scss'

type Props = {
    product: Product;
    onRemove: (productId: number) => void;
}
const Card = ({ product, onRemove } : Props) => {

    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img alt={product.name} src={product.imgUrl} className="product-card-admin-img"/>
                </div>
                <div className="col-7 py-3">
                    <h3>{product.name}</h3>
                    <ProductPrice price={product.price}/>
                    <div>
                        {product.categories.map(cat => (
                            <span className="badge badge-pill badge-secondary mr-2" key={cat.id}>{cat.name}</span>
                        ))}
                    </div>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link to={`/admin/products/${product.id}`} className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                        EDITAR
                    </Link>
                    <button type="button" className="btn btn-outline-danger btn-block border-radius-10 font-weight-bold " onClick={() => onRemove(product.id)}>
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card