import { Link } from "react-router-dom"

let Navbar = () => {
    return <nav className="navbar">
        <div className="navTitle">
            App Title
        </div>

        <Link className="btn primary">
            Log In
        </Link>

        <Link className="btn secondary">
            Sign up
        </Link>

    </nav>
}

export default Navbar