import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './core/components/NavBar'
import Admin from './pages/Admin'
import Catalog from './pages/Catalog'
import Home from './pages/Home'

// gerencia todas as rotas do projeto
// switch responsável por saber o que renderizar
// route definir cada URL da aplicação

const Routes = () => (
    <BrowserRouter> 
    <NavBar/>
       <switch>
           <Route path="/" exact>
               <Home/>
           </Route>
           <Route path="/catalog">
               <Catalog/>
           </Route>
           <Route path="/admin">
               <Admin/>
           </Route>
       </switch>
    </BrowserRouter>
    )

export default Routes