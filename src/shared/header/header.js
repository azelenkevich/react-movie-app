import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Header = () => {

    const [menu, setMenu] = useState(false)

    const showMenu = () => {
        setMenu(!menu);
    }

    const menuClass = menu ? 'header__nav shown' : 'header__nav';

    return (
        <div className="header bg-primary">
            <div className="container">
                <div className="header__left">
                    <Link to="/trending"
                          className="header__logo"><h1>Movie App</h1></Link>
                    <div className="burger"
                         onClick={showMenu}>Menu
                    </div>
                </div>
                <nav className={menuClass}>
                    <Link className="header__nav-item"
                          to="/trending"
                          onClick={showMenu}>Популярные</Link>
                    <Link to="/saved"
                          className="header__nav-item"
                          onClick={showMenu}>Сохраненные</Link>
                    <Link className="header__nav-item"
                          to="/search"
                          onClick={showMenu}>Поиск</Link>
                </nav>

            </div>
        </div>
    );
};

export default Header;
