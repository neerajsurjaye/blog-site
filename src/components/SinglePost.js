import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import script from "../scripts"
import Loader from "./Loader"
import Alert from "./Alert"

let SinglePost = () => {
    let params = useParams().id
    let [post, setPost] = useState()
    let [rerender, setreRender] = useState(0)

    useEffect(() => {
        script.getData(`/api/post/${params}`)
            .then((data) => {
                console.log(data);
                setPost(data.data)
            })
    }, [rerender, params])

    if (!post) {
        return <Loader></Loader>
    }

    return <>
        <div className="post">
            <div className="postHeader">

                <div className="postTitle">
                    {post.title}
                </div>

                <div className="postNameDateCont">
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

            </div>



            <div className="postDesc">
                {post.desc}
            </div>

        </div>

        <div className='commentsTitle'>
            Comments
        </div>

        <AddComment post={post} rerender={rerender} setRerender={setreRender}></AddComment>

        <Comments post={post}></Comments>
    </>
}

let AddComment = (props) => {
    let [comment, setComment] = useState()
    let [message, setMessage] = useState()
    let post = props.post

    let addComment = () => {
        script.postAuthData(
            `/api/comment/${post._id}`,
            { desc: comment },
            window.localStorage.getItem('auth')
        )
            .then((message) => {
                setMessage(message);
                console.log(props);
                props.setRerender(props.rerender + 1)
            })
    }

    let handleError = () => {
        if (message && message.err) {
            return <Alert message={message}></Alert>
        }
    }

    return <>
        {handleError()}
        <textarea
            placeholder='Add your comment here:'
            value={comment}
            onChange={e => setComment(e.target.value)}
        ></textarea>
        <div type='button' className='btn secondary' onClick={addComment} >Add Comment</div>
    </>
}


let Comments = (props) => {
    let post = props.post

    let generateComments = () => {
        console.log("generating comment");
        if (post.comments.length > 0) {

            let commentCards = []
            let comment = post.comments

            for (let val in comment) {

                commentCards.push(
                    <div className="post" key={val}>

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

    return <>
        {generateComments()}
    </>
}

export default SinglePost