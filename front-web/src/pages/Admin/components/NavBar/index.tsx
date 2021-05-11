import "./style.scss"

const NavBar = () => (
    <nav className="nav-menu-container">
        <ul>
            <li>
                <a href="link" className="nav-menu-item">Meus Produtos</a>
            </li>
            <li> 
                <a href="link" className="nav-menu-item active">Minhas Categorias</a>
            </li>
            <li>
                <a href="link" className="nav-menu-item">Meus Usuários</a>
            </li>
        </ul>
    </nav>
);


export default NavBar;