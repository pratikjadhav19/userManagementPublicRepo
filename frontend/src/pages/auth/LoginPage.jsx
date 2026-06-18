import React from 'react';

import {apiEndpoints, NetWorkMiddleware} from '../../api/axiosInstance';

import {useState} from 'react';



const LoginPage = () => {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here, e.g., make an API call to authenticate the user
        console.log('Logging in with:', { username, password });

        const loginPayload = {
            username: username,
            password: password
        }

        const resposnse = await NetWorkMiddleware(
            apiEndpoints.login,
            'POST',
            loginPayload
        );

        if( response.status == 200){

            // setEncryptedCookie("user",response.data);
        } else{
            console.error("Login failed:", response.data);
        }
    };



    return (
        <>


        <div> login page dummhy </div>

        <input type="text" placeholder='username' />
        <input type="password" placeholder='password' />
        <button>Login</button>

        </>
    );

}

export default LoginPage;