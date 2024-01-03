import {useState} from "react";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const register = async ev => {
        ev.preventDefault();
        try {
            const req = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({
                    username, password
                }),
                headers: {'Content-Type': 'application/json'}
            })
            const res = await req.json();
            console.log(res)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form action={''} method={'post'} className={'register'} onSubmit={register}>
                <h1>Create an Account</h1>
                <div className={'form-group'}>
                    <label htmlFor={'username'}>Username:</label>
                    <input type={'text'} id={'username'} placeholder={'Username...'} onChange={
                        ev => setUsername(ev.target.value)
                    }/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'password'}>Password:</label>
                    <input type={'password'} id={'password'} placeholder={'Password...'} onChange={
                        e => setPassword(e.target.value)
                    }/>
                </div>
                <button type={'submit'}>Sign-Up</button>
            </form>
        </div>
    )
}
export default RegisterPage
