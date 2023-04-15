import MenuNavbar from '../../elements/MenuNavbar/MenuNavbar'

const Navbar = () => {
    return(
        <nav className="navbar shadow-sm bg-light navbar-expand-lg bg-body-tertiary row">
            <div className="container-fluid">
                <div className=" col-9 ps-3">
                    <a className='navbar-brand' href="/">
                        Navbar
                    </a>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div 
                className="collapse navbar-collapse col-3 pt-1" 
                id="navbarNav">
                    <ul className="navbar-nav">
                        <MenuNavbar 
                            li="Home"
                            href = "/"
                        />
                        <MenuNavbar 
                            li="Features"
                        />
                        <MenuNavbar 
                            li="Pricing"
                        />
                        <MenuNavbar 
                            li="FAQs"
                        />
                        <MenuNavbar 
                            li="About"
                        />
                    </ul>
                </div>
            </div>
        </nav>
    )   
    
}

export default Navbar