import { useHistory } from "react-router";


const List = () => {
    // React Hook que cria uma pilha de rotas acessadas
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (<div>
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
    </div>)
};

export default List