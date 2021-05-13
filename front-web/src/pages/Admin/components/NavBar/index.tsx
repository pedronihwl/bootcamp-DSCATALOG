import { NavLink } from "react-router-dom";
import "./style.scss"

const NavBar = () => (
    <nav className="nav-menu-container">
        <ul>
            <li>
                <NavLink to="/admin/products" className="nav-menu-item">Meus Produtos</NavLink>
            </li>
            <li> 
                <NavLink to="/admin/categories" className="nav-menu-item">Minhas Categorias</NavLink>
            </li>
            <li>
                <NavLink to="/admin/users" className="nav-menu-item">Meus Usuários</NavLink>
            </li>
        </ul>
    </nav>
);


export default NavBar;