import "./style.scss"
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg'
import { generateList } from "core/utils/generateList"

type Props = {
    totalPages: number;
    activePage: number;
    //onChange: Function;
    onChange: (item: number) => void
}

const Pagination = ({totalPages, activePage, onChange}:Props) => {
    const items = generateList(totalPages);
    // [0,1,2,3,4]

    const previousClass = totalPages > 0 && activePage > 0 ? 'active-page': 'inactive-page';
    const nextClass = (activePage + 1) < totalPages ? 'active-page': 'inactive-page';


    return (<div className="pagination-container">
        <ArrowIcon className={`previous ${previousClass}`}
        onClick={() => onChange(activePage - 1)}
        />
        {items.map(item => (<div key={item} 
        className={`pagination-content ${activePage === item ? 'active' : ''}`} 
        // Onde a função é utilizada. Toda vez que clicar, o programa estará executando a função onChange que foi configurada no outro escopo.
        onClick={() => onChange(item)}>
            {item + 1}
        </div>))}

        <ArrowIcon className={`next ${nextClass}`}
        onClick={() => onChange(activePage + 1)}
        />

    </div>)

}

export default Pagination;

