import { useHistory } from 'react-router';
import './style.scss'

type Props = {
    title: string;
    children: React.ReactNode;
}

const BaseForm = ({title, children}:Props) => {
    const history = useHistory();
    const handleReturn = () => {
        history.push('../');
    }
    return <div className="base-form-container card-base">
        <h1 className="base-form-title">{title}</h1>
        {children}
        <div className="base-form-buttons">
            <button className="btn btn-outline-danger border-radius-10 mr-3" onClick={handleReturn}>CANCELAR</button>
            <button className="btn btn-primary border-radius-10">CADASTRAR</button>
        </div>
    </div>
};

export default BaseForm