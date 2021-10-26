import './style.scss'
import {ReactComponent as MainImage} from 'core/assets/images/main-image.svg'
import MainButton from 'core/components/MainButton'
import { Link } from 'react-router-dom'

const Home = () => {
    return <div className="home-container">
        <div className="home-content card-base border-radius-20">
            <div className="home-text">
                <h1 className="home-title">Conheça o melhor <br/> catálogo de produtos</h1>

                <p className="home-description">Ajudaremos você a encontrar os <br/> melhores produtos disponíveis no mercado.</p>
                <Link to="products" className="home-search-btn">
                    <MainButton texto="INICIE AGORA SUA BUSCA"/>
                </Link>
            </div>
            <div>
                    <MainImage className="main-image"/>
            </div>
        </div>
    </div>
}

export default Home