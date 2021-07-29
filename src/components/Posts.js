import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import script from '../scripts/index'
import Alert from "./Alert"
import Loader from "./Loader"

let CreatePostCard = (props) => {
    //creates post cards
    let post = props.post
    console.log(post);

    if (!post || post.length === 0) {
        return <div className="err">
            <Alert
                message={{ err: "No Posts or last page" }}
            ></Alert>
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
    let params = useParams()
    let [posts, setPosts] = useState()
    let [page, setPage] = useState(parseInt(params.page))

    let changePage = (change) => {
        if (change < 0) {
            change = 0
            return
        }
        setPage(change)
        setPosts(null)
    }

    let calcPage = (change) => {
        if (change < 0) {
            return 0
        }
        return change
    }


    useEffect(() => {
        // fetches post
        if (!page) {
            setPage(0)
        }

        if (page < 0) {
            setPage(0)
        }

        console.log(page);
        if (page >= 0) {
            script.getData(`/api/post/page/${page}`)
                .then((data) => {
                    setPosts(data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [page])

    if (!posts) {
        return <Loader></Loader>
    }

    console.log(posts, !posts);
    return <div className="posts">
        <CreatePostCard post={posts.data}></CreatePostCard>
        <div className="pageControl">
            <Link
                className="btn secondary btn-large"
                to={`/${calcPage(page - 1)}`}
                onClick={() => changePage(page - 1)}
            >Prev</Link>
            <Link
                className="btn primary btn-large"
                to={`/${page + 1}`}
                onClick={() => changePage(page + 1)}
            >Next</Link>
        </div>
    </div>
}

export default Posts