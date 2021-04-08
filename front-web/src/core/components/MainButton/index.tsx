import './style.scss'
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg'

type Props = {
    texto: string;

}

const MainButton = ({texto}:Props) => (
    <div className="d-flex"><button className="btn btn-primary btn-icon">
        <h5>{texto}</h5>

    </button>
        <div className="btn-icon-p"><ArrowIcon /></div>
    </div>)



export default MainButton