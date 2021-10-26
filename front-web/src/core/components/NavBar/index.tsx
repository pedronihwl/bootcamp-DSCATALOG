import './style.scss'
import  {Link, NavLink } from 'react-router-dom'
import { getTokenDecoded, makeLogout } from 'core/utils/requests';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import menuBurger from '../../assets/images/menu-burger.svg'

const NavBar = () => {
    const [drawerActive, setDrawerActive] = useState(false)
    const [currentUser, setCurrentUser] = useState('')
    const location = useLocation()

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        makeLogout()

    }

    useEffect(() => {
        const token = getTokenDecoded();
        setCurrentUser(token.user_name)

    },[location])

    return (<nav className="bg-primary main-nav">

            <Link to="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </Link>

        <button type="button" className="menu-mobile-btn">
            <img src={menuBurger} alt="Menu Mobile" onClick={() => setDrawerActive(!drawerActive)}></img>
        </button>

        <div className={ drawerActive ? "menu-mobile-container" : "menu-container"}>
            <ul className="main-menu">
                <li>
                    <NavLink to="/" activeClassName="active" exact className="nav-link" onClick={() => setDrawerActive(false)}>HOME</NavLink>
                </li>
                <li>
                    <NavLink to="/products" activeClassName="active" className="nav-link" onClick={() => setDrawerActive(false)}>CATÁLOGO</NavLink>
                </li>
                <li>
                    <NavLink to="/admin" activeClassName="active" className="nav-link" onClick={() => setDrawerActive(false)}>ADMIN</NavLink>
                </li>
                {
                    drawerActive && (
                        <li>
                            {
                                currentUser && (
                                    <a href="#logout" className="nav-link active d-inline" onClick={() => setDrawerActive(false)}>
                                        {`SAIR - ${currentUser}`}
                                    </a>
                                )
                            }
                        </li>
                    )
                }
                {
                   drawerActive && (
                       <>
                           {
                               !currentUser && (
                                   <li>
                                       <Link to="/auth/login" className="nav-link active" onClick={() => setDrawerActive(false)}>LOGIN</Link>
                                   </li>
                               )
                           }
                       </>
                   )
                }
            </ul>
        </div>
        <div className="user-info-dnone text-right">
            {currentUser && (
                <>
                {currentUser}
                <a href='#logout' className="nav-link active d-inline" onClick={(event) => {handleLogout(event); setDrawerActive(false)}}> SAIR </a>
                </>
            )}
            {!currentUser && (
                <Link to="/auth/login" className="nav-link active">LOGIN</Link>
            )}          
        </div>
    </nav>)

}

export default NavBar
