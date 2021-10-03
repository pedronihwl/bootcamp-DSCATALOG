import Pagination from "core/components/Pagination";
import { ContentResponse } from "core/types/Product";
import { makePrivateRequest, makeRequest } from "core/utils/requests";
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Card from "../Card";
import CardLoader from "../CardLoader";


const List = () => {
    const history = useHistory();
    const [contentResponse, setContentResponse] = useState<ContentResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }
    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir o produto?')

        if(confirm){
            makePrivateRequest({ url: `/products/${productId}`, met: 'DELETE', })
            .then(() => {
                toast.info('Produto excluido com sucesso')
                getProducts();
            })
            .catch(() => toast.error('Erro ao excluir produto'))
        }
    }

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            size: 4,
            sort: 'id,DESC'
        }
        setIsLoading(true);
        makeRequest({url: '/products', params,})
        .then(r => setContentResponse(r.data)).finally(() => {
            setIsLoading(false);
        })
    },[activePage])

    useEffect(() => {
        getProducts();
    },[getProducts])

    return (<div>
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
        <div className="admin-list-container">
            {isLoading ? <CardLoader/> : 
            contentResponse?.content.map( product => (
                <Card product={product} key={product.id} onRemove={onRemove}/>
            ))}
        {contentResponse && <Pagination totalPages={contentResponse?.totalPages} activePage={activePage} onChange={page => setActivePage(page)}/>}
        </div>
    </div>)
};

export default List