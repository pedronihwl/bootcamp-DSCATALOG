import {Switch, Route} from 'react-router-dom'
import Form from './Form'
import List from './List'

const Product = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <List/>
                </Route>
                <Route path="/admin/products/create">
                    <Form/>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1>Editar </h1>
                </Route>
            </Switch>
        </div>
    );
}

export default Product;