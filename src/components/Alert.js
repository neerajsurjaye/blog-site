// import { Link } from 'react-router-dom'

let Alert = (props) => {

    if (props.message) {

        if (props.message.err) {
            return <>
                <div className="error">
                    <h2>Error</h2>
                    <div >{props.message.err}</div>
                </div >
                <a href='/' className='btn secondary'>
                    Home
                </a>
            </>
        }

        if (props.message.success) {
            return <>
                <div className="success">
                    <h2>Success</h2>
                    <div>{props.message.success}</div>
                    <div>{props.warn}</div>
                </div >
                {
                    props.to ? <a href={props.to} className='btn primary'>Login</a> : <></>
                }
                <a href='/' className='btn secondary'>
                    Home
                </a>
            </>
        }

    }

    return <div className="container">
        "Message object wrongly configured"
    </div>

}

export default Alert