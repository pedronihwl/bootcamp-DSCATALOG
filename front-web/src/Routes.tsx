import Auth from 'pages/Auth'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './core/components/NavBar'
import Admin from './pages/Admin'
import Catalog from './pages/Catalog'
import ProductDescription from './pages/Catalog/components/ProductDescription/ProductDescription'
import Home from './pages/Home'

// gerencia todas as rotas do projeto
// switch responsável por saber o que renderizar
// route definir cada URL da aplicação

const Routes = () => (
    <BrowserRouter> 
    <NavBar/>
       <Switch>
           <Route path="/" exact>
               <Home/>
           </Route>
           <Route path="/products" exact>
               <Catalog/>
           </Route>
           <Route path="/products/:productId">
               <ProductDescription/>
           </Route>
           <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
           <Route path="/admin/auth">
               <Auth/>
           </Route>
           <Redirect from="/admin" to="/admin/products" exact/>
           <Route path="/admin">
               <Admin/>
           </Route>
       </Switch>
    </BrowserRouter>
    )

export default Routes
