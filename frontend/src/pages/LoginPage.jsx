import {useState,useContext} from "react";
import { useNavigate} from 'react-router-dom';
import UserContext from "../userContext";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    const signIn = async ev =>{
        ev.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/login',{
                method: 'POST',
                body: JSON.stringify({
                    username, password
                }),
                headers: {'Content-Type': 'application/json'},
                credentials:"include",
            })
            if (response.ok){
                const data = await response.json();
                setUserInfo(data);
                navigate('/');
            }else{
                console.log('Login Failed');
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <form action={''} method={'post'} className={'register'} onSubmit={signIn}>
            <h1>Welcome Back</h1>
            <div className={'form-group'}>
                <label htmlFor={'username'}>Username:</label>
                <input type={'text'} id={'username'} placeholder={'Username...'} onChange={(ev)=>{
                    setUsername(ev.target.value)
                }}/>
            </div>
            <div className={'form-group'}>
                <label htmlFor={'password'}>Password:</label>
                <input type={'password'} id={'password'} placeholder={'Password...'} onChange={ev=>{
                    setPassword(ev.target.value)
                }}/>
            </div>
            <button type={'submit'} className={'primary'}>Sign-In</button>
        </form>
    )
}
export default LoginPage
