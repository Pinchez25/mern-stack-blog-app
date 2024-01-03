import Post from "../post.jsx";
import {useEffect, useState} from "react";

const IndexPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data =>{
                const {posts} = data;
                setPosts(posts)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {posts.map(post => <Post key={post._id} {...post}/>)}
        </>
    )
}
export default IndexPage
