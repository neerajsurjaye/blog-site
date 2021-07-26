import { Link } from 'react-router-dom'

let AddPost = () => {
    return <div className="add-post">
        <Link className="btn" to='/add-post'>
            + Post
        </Link>
    </div>
}

export default AddPost