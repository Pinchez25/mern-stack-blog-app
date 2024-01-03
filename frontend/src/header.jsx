import {Link} from 'react-router-dom'
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "./userContext";

const Header = () => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    // const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const username = userInfo?.username;

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        })
            .then(r => {
                // console.log(r)
                return r.json()
            })
            .then(data => {
                // console.log(data)
                setUserInfo(data)
            })
            .catch(err => console.log(err))
    }, []);

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                setUserInfo(null);
                navigate('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header>

            <Link to={'/'} className={'logo'}>Peter&apos;s Blog</Link>
            <nav>
                {username &&
                    <>
                        <Link to={'/create-post'}>Create Post</Link>
                        <Link to={'/logout'} onClick={logout}>Logout</Link>
                    </>
                }
                {!username ? <Link to={'/login'}>Login</Link> : ''}
                <Link to={'/register'}>Register</Link>
            </nav>
        </header>
    )
}
export default Header
