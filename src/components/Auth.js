import { useState } from "react"
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom"
import script from '../scripts/index'

let SignUp = () => {
    // signupform
    let [name, setName] = useState('')
    let [pass, setPass] = useState('')

    let handleSignUp = (e) => {
        script.postData('/api/auth/sign-up', { name, pass })
            .then((data) => {
                console.log("res", data);
            })
    }

    return <div className="auth">
        <h1>Sign-Up</h1>
        <form>
            <label>UserName:</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value); }}></input>
            <label>Password:</label>
            <input type='password' value={pass} onChange={(e) => { setPass(e.target.value); }}></input>
            <input type='button' onClick={handleSignUp} value='Submit'></input>
        </form>
    </div>
}

let LogIn = () => {
    // log in form
    let [name, setName] = useState('')
    let [pass, setPass] = useState('')

    let handleLogIn = (e) => {
        script.postData('http://localhost:5000/api/auth/log-in', { name, pass })
            .then((data) => {
                console.log("res", data);
            })
    }

    return <div className="auth">
        <h1>Log-in</h1>
        <form>
            <label>UserName:</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value); }}></input>
            <label>Password:</label>
            <input type='password' value={pass} onChange={(e) => { setPass(e.target.value); }}></input>
            <input type='button' onClick={handleLogIn} value='Submit'></input>
        </form>
    </div>
}

let Auth = (props) => {
    // auth handler
    let match = useRouteMatch();
    console.log(match);

    return <>
        <Switch>

            <Route exact path={match.path + 'sign-up'}>
                <SignUp></SignUp>
            </Route>

            <Route exact path={match.path + 'log-in'}>
                <LogIn></LogIn>
            </Route>

        </Switch>
    </>
}

export default Auth