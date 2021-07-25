import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import script from '../scripts/index'

let CreatePostCard = (props) => {
    //creates post cards
    let post = props.post

    if (!post) {
        return <div className="err">
            No Posts
        </div>
    }

    let postCards = []
    for (let val in post) {
        postCards.push(
            <div className="post" key={val}>
                <div className="postTitle">{post[val].title}</div>
                <div className="postDesc">{post[val].desc}</div>
                <div className="comments">Comments : {post[val].comments.length}</div>
            </div >
        )
    }

    return <div className="postCont">
        {postCards}
    </div>
}

let Posts = (props) => {
    // fetches posts and creates card
    let [posts, setPosts] = useState()

    useEffect(() => {
        script.getData('/api/post')
            .then((data) => {
                console.log(data);
                setPosts(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    if (!posts) {
        return <div className="loader">
            Loading
        </div>
    }

    return <div className="posts">
        <CreatePostCard post={posts.data}></CreatePostCard>
    </div>
}

export default Posts