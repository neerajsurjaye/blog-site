import { Link } from 'react-router-dom'

let Alert = (props) => {

    if (props.message) {

        if (props.message.err) {
            return <div className="container">
                <div className="error">
                    <h2>Error</h2>
                    <div >{props.message.err}</div>
                </div >
                <Link to='/' className='btn secondary'>
                    Home
                </Link>
            </div>
        }

        if (props.message.success) {
            return <div className="container">
                <div className="success">
                    <h2>Success</h2>
                    <div>{props.message.success}</div>
                </div >
                <Link to='/' className='btn secondary'>
                    Home
                </Link>
            </div>
        }

    }

    return <div className="container">
        "Message object wrongly configured"
    </div>

}

export default Alert