import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const DeletePostPage = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(res=>res.json())
            .then(data=>setPost(data.post))
            .catch(
                err=>console.log(err)
            )
    }, []);
    const cancelDelete = () => {
        navigate(`/post/${id}`)
    }
    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/delete-post/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.ok) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            // remain on the same page
            navigate(`/post/${id}/delete`)
        }
    }
    return (
        <div className={'delete-actions'}>
            <h1>Delete Post!</h1>
            <p>
                Are you sure you want to delete this post?
                <span id="post-to-delete">{post && <span>{post.title}</span>}</span>
            </p>
            <div className={'buttons'}>
                <button className={'danger'} onClick={deletePost}>Delete</button>
                <button className={'info'} onClick={cancelDelete}>Cancel</button>
            </div>
        </div>
    );
}
export default DeletePostPage;