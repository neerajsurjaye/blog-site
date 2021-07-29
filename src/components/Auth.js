import { useState } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import script from '../scripts/index'
import Alert from "./Alert"

let SignUp = () => {
    // signupform
    let [name, setName] = useState('')
    let [pass, setPass] = useState('')
    let [message, setMessage] = useState()


    let handleSignUp = (e) => {
        script.postData('/api/auth/sign-up', { name, pass })
            .then((data) => {
                console.log(data);
                setMessage(data)
            })
    }

    if (message) {
        return <Alert message={message} to={"/auth/log-in"}></Alert>
    }

    return <>
        <h1>Sign-Up</h1>
        <form>
            <label className='inputTitle'>UserName:</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value); }}></input>

            <label className='inputTitle'>Password:</label>
            <input type='password' value={pass} onChange={(e) => { setPass(e.target.value); }}></input>

            <input type='button' className='btn' onClick={handleSignUp} value='Submit'></input>
        </form>
    </>
}

let LogIn = () => {
    // log in form
    let [name, setName] = useState('')
    let [pass, setPass] = useState('')
    let [message, setMessage] = useState()


    let handleLogIn = (e) => {
        script.postData('/api/auth/log-in', { name, pass })
            .then((data) => {
                console.log("res", data);
                window.localStorage.setItem('auth', data.token)
                setMessage(data)
            })
    }

    if (message) {
        return <Alert message={message}></Alert>
    }

    return <>
        <h1>Log-in</h1>
        <form>
            <label className='inputTitle'>UserName:</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value); }}></input>

            <label className='inputTitle'>Password:</label>
            <input type='password' value={pass} onChange={(e) => { setPass(e.target.value); }}></input>

            <input type='button' className='btn' onClick={handleLogIn} value='Submit'></input>
        </form>
    </>
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