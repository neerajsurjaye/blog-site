import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import script from "../scripts"

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
    }, [rerender])

    if (!post) {
        return <div className="loading">
            Loading
        </div>
    }

    return <div className="container">
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

        <div>
            Comments
        </div>

        <AddComment post={post} rerender={rerender} setRerender={setreRender}></AddComment>

        <Comments post={post}></Comments>
    </div >
}

let AddComment = (props) => {
    let [comment, setComment] = useState()
    let post = props.post

    let addComment = () => {
        console.log(post);
        script.postAuthData(
            `/api/comment/${post._id}`,
            { desc: comment },
            window.localStorage.getItem('auth')
        )
            .then((message) => {
                console.log(message);
                console.log(props);
                props.setRerender(props.rerender + 1)
            })
    }

    return <>
        <textarea
            placeholder='Add your comment here:'
            value={comment}
            onChange={e => setComment(e.target.value)}
        ></textarea>
        <div className='btn secondary' onClick={addComment}>Add Comment</div>
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