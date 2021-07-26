import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import script from "../scripts"

let SinglePost = () => {
    let params = useParams().id
    let [post, setPost] = useState()

    useEffect(() => {
        script.getData(`/api/post/${params}`)
            .then((data) => {
                console.log(data);
                setPost(data.data)
            })
    }, [])

    if (!post) {
        return <div className="loading">
            Loading
        </div>
    }

    let generateComments = () => {
        if (post.comments.length > 0) {

            let commentCards = []
            let comment = post.comments

            for (let val in comment) {
                console.log(comment[val].user);

                commentCards.push(
                    <div className="post">

                        <div className="postHeader">
                            <div className="postUser">
                                {
                                    (comment[val].user) ?
                                        comment[val].user.userName : '[deleted]'
                                }
                            </div>
                            <div className="postDate">
                                {script.getFullDateAndTime(comment[val].date)}
                            </div>
                        </div>

                        <div className="postDesc">
                            {comment[val].desc}
                        </div>
                    </div>
                )
            }

            return commentCards
        }
    }


    return <div className="container">
        <div className="post">

            <div className="postHeader">
                {
                    post.userid ?
                        <div className="post-user-name">
                            {post.userid.userName}
                        </div> :
                        <div className="post-user-name">
                            "[deleted]"
                        </div>
                }
                <div className="postDate">
                    {(script.getFullDateAndTime(Date.parse(post.date)))}
                </div>
            </div>


            <div className="postTitle">
                {post.title}
            </div>
            <div className="postDesc">
                {post.desc}
            </div>

        </div>

        <div className="comments">
            Comments
        </div>
        {generateComments()}
    </div>
}

export default SinglePost