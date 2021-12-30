import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Login Successful");
            history.push("/");
        }
    }
    return (
        <>
            <form method="POST">
                <div>
                    <label htmlFor="email">Email:&emsp;</label>
                    <input type="email" name="email" id="email" autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="password">Password:&emsp;</label>
                    <input type="password" name="password" id="password" autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                </div>
                <br></br>
                <div>
                    <input type="submit" name="signin" id="signin" value="LogIn" onClick={loginUser} />
                </div>
            </form>
        </>
    )
}

export default Login;