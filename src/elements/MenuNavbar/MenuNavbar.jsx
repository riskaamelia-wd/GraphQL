import './MenuNavbar.css'
const MenuNavbar = (props) => {
    return(
        <li className="nav-item">
            <a className="nav-link" href={props.href? props.href : '#'}>
                    {props.li}
            </a>
        </li>
    )
}

export default MenuNavbar