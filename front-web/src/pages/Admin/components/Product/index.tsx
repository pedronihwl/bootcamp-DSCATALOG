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
                <Route path="/admin/products/:productId">
                    <Form/>
                </Route>
            </Switch>
        </div>
    );
}

export default Product;