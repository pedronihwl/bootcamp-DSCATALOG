import NavBar from "./components/NavBar"
import { Switch, Route } from 'react-router-dom'
import "./style.scss"
import Product from "./components/Product"

const Admin = () => {
    return <div className="admin-content-container">
        <NavBar />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Product/>
                </Route>
                <Route path="/admin/categories">
                    <h1>Categorias</h1>
                </Route>
                <Route path="/admin/users">
                    <h1>Usuários</h1>
                </Route>
            </Switch>
        </div>
    </div>
}

export default Admin