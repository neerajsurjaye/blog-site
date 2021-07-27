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

    // creates post array and push cards in array
    let postCards = []
    for (let val in post) {
        if (post[val]) {
            postCards.push(
                <Link className="post" key={val} to={`/post/${post[val]._id}`}>

                    <div className="postHeader">
                        <div className="postTitle">{post[val].title}</div>

                        <div className="postNameDateCont">
                            {
                                post[val].userid ?
                                    <div className="post-user-name">
                                        - {post[val].userid.userName}
                                    </div> :
                                    <div className="post-user-name">
                                        "[deleted]"
                                    </div>
                            }
                            <div className="postDate">
                                {(script.getFullDateAndTime(Date.parse(post[val].date)))}
                            </div>
                        </div>
                    </div>



                    <div className="postDesc">{post[val].desc}</div>
                    <div className="postComments">Comments : {post[val].comments.length}</div>

                </Link >
            )
        }
    }

    return <div className="postCont">
        {postCards}
    </div>
}

let Posts = (props) => {
    // fetches posts and creates card
    let [posts, setPosts] = useState()

    useEffect(() => {
        // fetches post
        script.getData('/api/post')
            .then((data) => {
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