import NavBar from "./components/NavBar"
import { Switch } from 'react-router-dom'
import "./style.scss"
import Product from "./components/Product"
import PrivateRoute from 'core/components/PrivateRoute'

const Admin = () => {
    return <div className="admin-content-container">
        <NavBar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Product/>
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <h1>Categorias</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoles={['ROLE_ADMIN']}>
                    <h1>Usuários</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
}

export default Admin