import './style.scss'

type Props = {
    price: number;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(price)
}

const ProductPrice = ({price}:Props) => (
    <div className="product-price-container">
        <span className="price-currency">R$</span>
        <h3 className="price">{formatPrice(price)}</h3>
    </div>
)

export default ProductPrice
