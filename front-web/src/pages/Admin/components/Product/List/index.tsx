import Pagination from "core/components/Pagination";
import { ContentResponse } from "core/types/Product";
import { makeRequest } from "core/utils/requests";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "../Card";


const List = () => {
    const history = useHistory();
    const [contentResponse, setContentResponse] = useState<ContentResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    useEffect(() => {
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

    return (<div>
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
        <div className="admin-list-container">
            {contentResponse?.content.map( product => (
                <Card product={product} key={product.id}/>

            ))}
        {contentResponse && <Pagination totalPages={contentResponse?.totalPages} activePage={activePage} onChange={page => setActivePage(page)}/>}
        </div>
    </div>)
};

export default List