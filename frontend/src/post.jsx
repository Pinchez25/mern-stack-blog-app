import ReactTimeAgo from "react-time-ago";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Post = ({_id,title, author, description, image, createdAt}) => {
    const capitaliseFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={'post'}>
            <div className={'image'}>
                <Link to={`/post/${_id}`}>
                    <img src={image} alt={title}/>
                </Link>
            </div>
            <div className={'content'}>
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className={'info'}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <a className={'author'}>{author?.username ? capitaliseFirstLetter(author.username) : "Anonymous"}</a>
                    <ReactTimeAgo date={new Date(createdAt)} locale={'en-GB'}/>
                </p>
                <p className={'summary'}>
                    {description}
                </p>
            </div>
        </div>
    )
}
export default Post