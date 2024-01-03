import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link', 'image'],
            ['clean'],
            ['code-block']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'code-block'
    ]

    const createPost = async ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        formData.append('content', content);
        try {
            const response = await fetch('http://localhost:3000/create-post', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            if (response.ok) {
                // const data = await response.json();
                // console.log(data);
                navigate('/');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileChange = ev => {
        const file = ev.target.files[0];
        setImage(file);
    }

    return (
        <div>
            <form action={''} method={'post'} className={'create-post'} onSubmit={createPost}
                  encType={'multipart/form-data'}>
                <div className={'form-group'}>
                    <label htmlFor={'title'}>Title:</label>
                    <input type={'text'} id={'title'} placeholder={'Title...'} value={title} onChange={
                        ev => {
                            setTitle(ev.target.value)
                        }
                    } name={'title'}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'description'}>Description:</label>
                    <input type={'text'} id={'description'} placeholder={'Description...'} value={description}
                           onChange={
                               ev => {
                                   setDescription(ev.target.value)
                               }
                           } name={'description'}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'image'}>Image:</label>
                    <input type={'file'} id={'image'} accept={'image/*'} onChange={handleFileChange} placeholder={
                        'Upload Image...'
                    } name={'image'}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'content'}>Content:</label>
                    <ReactQuill theme={'snow'} id={'content'} modules={modules} formats={formats}
                                placeholder={'Content...'} value={content} onChange={
                        ev => {
                            setContent(ev)
                        }
                    }/>
                </div>
                <button type={'submit'} className={'info'}>Create Post</button>
            </form>
        </div>
    )
}

export default PostForm;