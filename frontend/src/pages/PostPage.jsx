import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserContext from "../userContext.jsx";
// eslint-disable-next-line react/prop-types
const PostPage = () => {
    const [post, setPost] = useState({});
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(res => res.json())
            .then(data => setPost(data.post))
            .catch(
                err => console.log(err)
            )
    }, []);

    const btnDeleteAction = async (e) => {
        e.preventDefault();
        navigate(`/post/${id}/delete`)

    }

    const btnEditAction = async (e) => {
        e.preventDefault();
        navigate(`/post/${id}/edit`)
    }
    return (
        <div className={'post-page'}>
            <h1>{post?.title}</h1>
            <div className={'post-date'}>
                Posted: <time>{new Date(post?.createdAt).toDateString()}</time>
            </div>
            <div className={'post-author'}>
                by {post?.author?.username || 'Anonymous'}
                {userInfo?.id && post?.author?._id && userInfo?.id === post?.author?._id && (

                    <div className={'action-btns'}>
                        <a role={'button'} className={'btn-edit'} onClick={btnEditAction}>Edit</a>
                        <a role={'button'} className={'btn-delete'} onClick={btnDeleteAction}>Delete</a>
                    </div>
                )}

            </div>
            <div className={'post-image'}>
                <img src={post?.image} alt={post?.title} className={'shake'}/>
            </div>
            <div className={'post-content'}>
                <div dangerouslySetInnerHTML={{__html: post?.content}}/>
            </div>
        </div>
    )
}
export default PostPage;