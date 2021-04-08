import './style.scss'

const NavBar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <a href="Test" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </a>
        </div>
        <div className="col-6 offset-2">
            <ul className="main-menu">
                <li>
                    <a href="Test" className="active">HOME</a>
                </li>
                <li>
                    <a href="Test">CATÁLOGO</a>
                </li>
                <li>
                    <a href="Test">ADMINISTRADOR</a>
                </li>
            </ul>
        </div>
    </nav>)


export default NavBar