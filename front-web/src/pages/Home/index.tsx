import './style.scss'
import {ReactComponent as MainImage} from 'core/assets/images/main-image.svg'
import MainButton from 'core/components/MainButton'
import { Link } from 'react-router-dom'

const Home = () => {
    return <div className="home-container">
        <div className="row home-content card-base">
            <div className="col-6 home-text">
                <h1 className="home-title">Conheça o melhor <br/> catálogo de produtos</h1>

                <p className="home-description">Ajudaremos você a encontrar os <br/> melhores produtos disponíveis no mercado.</p>
                <Link to="products">
                    <MainButton texto="INICIE AGORA SUA BUSCA"/>
                </Link>
            </div>
            <div className="col-6">
                    <MainImage className="main-image"/>
            </div>
        </div>
    </div>
}

export default Home