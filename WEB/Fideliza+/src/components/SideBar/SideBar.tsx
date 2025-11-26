import { BsFillHouseFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
    
    const location = useLocation();
    const currentPath = location.pathname;

    const navItens = [
        { name: "Dashboard", path: "/dashboard", icon: <BsFillHouseFill className="me-2"/> },
        { name: "Cadastrar Cliente", path: "/cadastrar-cliente", icon: <BsFillHouseFill className="me-2"/> },
        { name: "Lançar Pontos", path: "/lançar-pontos", icon: <BsFillHouseFill className="me-2"/> },
        { name: "Consultar Clientes", path: "/consultar-clientes", icon: <BsFillHouseFill className="me-2"/> },
    ];


    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                {/* You can replace this with a logo image if needed */}
                <span className="fs-4">Fideliza+</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {
                    navItens.map((item) => (
                        <li className="nav-item">
                            <Link to={item.path} className={`nav-link ${currentPath === item.path ? 'active' : ''}`}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SideBar;