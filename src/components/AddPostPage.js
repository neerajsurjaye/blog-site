import { useState } from "react"
import script from "../scripts/index"

let AddPostPage = () => {
    let [title, setTitle] = useState("")
    let [desc, setDesc] = useState("")

    let handleSubmit = () => {
        script.postAuthData('/api/post', { title, desc }, window.localStorage.getItem('auth'))
            .then((data) => {
                console.log(data);
            })
    }

    return <div className="addPostPage">
        <form>
            <label>Name:</label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <label>Desc</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            <input type='button' value='Submit' onClick={handleSubmit}></input>
        </form>
    </div >
}

export default AddPostPage