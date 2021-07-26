import { Link } from "react-router-dom"

let Navbar = () => {
    return <nav className="navbar">
        <div className="navTitle">
            App Title
        </div>

        <Link className="btn primary to-right" to='/auth/log-in'>
            Log In
        </Link>

        <Link className="btn secondary" to='/auth/sign-up'>
            Sign up
        </Link>

    </nav>
}

export default Navbar