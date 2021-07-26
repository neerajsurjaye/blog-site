import { useState } from "react"
import script from "../scripts/index"
import Alert from "./Alert"

let AddPostPage = () => {
    let [title, setTitle] = useState("")
    let [desc, setDesc] = useState("")
    let [message, setMessage] = useState()

    let handleSubmit = () => {
        script.postAuthData('/api/post', { title, desc }, window.localStorage.getItem('auth'))
            .then((data) => {
                console.log(data);
                setMessage(data)
            })
    }

    if (message) {
        return <Alert message={message}></Alert>
    }

    return <div className="container">

        <h2>Add Post</h2>
        <form>
            <label className='inputTitle'>Title:</label>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}></input>

            <label className='inputTitle'>Desc</label>
            <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <input type='button' value='Submit' className='btn' onClick={handleSubmit}></input>
        </form>

    </div >
}

export default AddPostPage