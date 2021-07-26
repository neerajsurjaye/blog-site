import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import script from '../scripts/index'

let Navbar = () => {
    let [user, setUser] = useState()

    let logOut = () => {
        window.localStorage.removeItem('auth')
        setUser(null)
    }

    useEffect(() => {
        let auth = window.localStorage.getItem('auth')
        console.log("ran ", auth);
        if (auth) {
            script.getAuthData('/api/user/', auth)
                .then((data) => {

                    if (data.success) {
                        setUser(data.data)
                    } else {
                        setUser(null)
                    }
                })
        }
    }, [])

    console.log(user);
    return <nav className="navbar">
        <div className="navTitle">
            >.log
        </div>

        {
            user ? <>
                <Link className="btn secondary to-right" to={`/user/${user.id}`}>
                    {user.username}
                </Link>

                <div className="btn primary" onClick={logOut}>
                    LogOut
                </div>
            </> : <>
                <Link className="btn primary to-right" to='/auth/log-in'>
                    Log In
                </Link>

                <Link className="btn secondary" to='/auth/sign-up'>
                    Sign up
                </Link>
            </>
        }
    </nav >
}

export default Navbar